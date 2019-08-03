import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Nav from '../../components/Nav';
import Brand from '../../components/Brand';
import Box from '../../components/Box';
import Title from '../../components/Title';
import Logo from '../../components/Logo';
import Spacer from '../../components/Spacer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import VerticalForm from '../../components/VerticalForm';
import { Formik, Field } from 'formik';
import * as AuthService from '../../services/auth'
import { useRouter } from 'next/router';

export default function SignIn() {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Sign in - Aula</title>
            </Head>
            <Layout>
                <Nav>
                    <Brand>
                        <Link href="/"><Logo src="/static/images/logo.svg" alt="Aula" /></Link>
                    </Brand>
                </Nav>
                <Box style={{ maxWidth: '380px'}}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await AuthService.login({
                                    email: values.email,
                                    password: values.password
                                })
                                router.push(`/`)
                            } catch (err) {
                                alert(`Something went wrong ${err.message} ${err.code}`)
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <VerticalForm onSubmit={handleSubmit}>
                                <Title>Sign in</Title>
                                <p>Only a few more steps and you're in!</p>
                                <Spacer />
                                <Spacer />
                                    <Field render={({ field }) => <Input {...field} type="email" placeholder="Email" />} name="email" />
                                    <Field render={({ field }) => <Input {...field} placeholder="Password" type="password" />} name="password" />
                                    <Button primary type="submit" disabled={isSubmitting}>Sign in</Button>
                                <Spacer />
                                <Spacer />
                                <Link href="/auth/forgot-password">Forgot password</Link>
                            </VerticalForm>
                        )}
                    </Formik>
                </Box>
            </Layout>
        </>
    )
}
