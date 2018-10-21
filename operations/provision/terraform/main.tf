variable "access_key" {
  type = "string"
}

variable "secret_key" {
  type = "string"
}

variable "cluster-name" {
  default = "aula-eks"
  type    = "string"
}

provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "eu-west-1"
}

// Base VPC Networking
data "aws_availability_zones" "available" {}

resource "aws_vpc" "aula" {
  cidr_block = "10.0.0.0/16"

  tags = "${
    map(
     "Name", "terraform-eks-aula-node",
     "kubernetes.io/cluster/${var.cluster-name}", "shared",
    )
  }"
}

resource "aws_subnet" "aula" {
  count = 2

  availability_zone = "${data.aws_availability_zones.available.names[count.index]}"
  cidr_block        = "10.0.${count.index}.0/24"
  vpc_id            = "${aws_vpc.aula.id}"

  tags = "${
    map(
     "Name", "terraform-eks-aula-node",
     "kubernetes.io/cluster/${var.cluster-name}", "shared",
    )
  }"
}

resource "aws_internet_gateway" "aula" {
  vpc_id = "${aws_vpc.aula.id}"

  tags {
    Name = "terraform-eks-aula"
  }
}

resource "aws_route_table" "aula" {
  vpc_id = "${aws_vpc.aula.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.aula.id}"
  }
}

resource "aws_route_table_association" "aula" {
  count = 2

  subnet_id      = "${aws_subnet.aula.*.id[count.index]}"
  route_table_id = "${aws_route_table.aula.id}"
}

// EKS Master Cluster IAM Role
resource "aws_iam_role" "aula-cluster" {
  name = "terraform-eks-aula-cluster"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "aula-cluster-AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = "${aws_iam_role.aula-cluster.name}"
}

resource "aws_iam_role_policy_attachment" "aula-cluster-AmazonEKSServicePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSServicePolicy"
  role       = "${aws_iam_role.aula-cluster.name}"
}

// EKS Master Cluster Security Group
resource "aws_security_group" "aula-cluster" {
  name        = "terraform-eks-aula-cluster"
  description = "Cluster communication with worker nodes"
  vpc_id      = "${aws_vpc.aula.id}"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name = "terraform-eks-aula"
  }
}

# OPTIONAL: Allow inbound traffic from your local workstation external IP
#           to the Kubernetes. You will need to replace A.B.C.D below with
#           your real IP. Services like icanhazip.com can help you find this.
// resource "aws_security_group_rule" "aula-cluster-ingress-workstation-https" {
//   cidr_blocks       = ["A.B.C.D/32"]
//   description       = "Allow workstation to communicate with the cluster API Server"
//   from_port         = 443
//   protocol          = "tcp"
//   security_group_id = "${aws_security_group.aula-cluster.id}"
//   to_port           = 443
//   type              = "ingress"
// }

// EKS Master Cluster
resource "aws_eks_cluster" "aula" {
  name            = "${var.cluster-name}"
  role_arn        = "${aws_iam_role.aula-cluster.arn}"

  vpc_config {
    security_group_ids = ["${aws_security_group.aula-cluster.id}"]
    subnet_ids         = ["${aws_subnet.aula.*.id}"]
  }

  depends_on = [
    "aws_iam_role_policy_attachment.aula-cluster-AmazonEKSClusterPolicy",
    "aws_iam_role_policy_attachment.aula-cluster-AmazonEKSServicePolicy",
  ]
}

// Configuring kubectl for EKS
locals {
  kubeconfig = <<KUBECONFIG


apiVersion: v1
clusters:
- cluster:
    server: ${aws_eks_cluster.aula.endpoint}
    certificate-authority-data: ${aws_eks_cluster.aula.certificate_authority.0.data}
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: aws
  name: aws
current-context: aws
kind: Config
preferences: {}
users:
- name: aws
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1alpha1
      command: aws-iam-authenticator
      args:
        - "token"
        - "-i"
        - "${var.cluster-name}"
KUBECONFIG
}

output "kubeconfig" {
  value = "${local.kubeconfig}"
}
