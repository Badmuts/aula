#!/usr/bin/env node

const request = require('http').request(
    {
      host: 'localhost',
      port: process.env.PORT || 3000,
      timeout: 1000
    },
    res => {
      process.exit(res.statusCode === 200 ? 0 : 1);
    }
  );

  request.on('error', () => {
    process.exit(1);
  });

  request.end()
