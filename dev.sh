#!/bin/bash

cd "$(dirname "$0")"

case "${1:-help}" in
  install)
    npm --prefix client install 2>/dev/null || true
    npm --prefix server install 2>/dev/null || true
    ;;
  dev)
    npm --prefix server run dev &
    sleep 1
    npm --prefix client run dev
    ;;
  client)
    npm --prefix client run dev
    ;;
  server)
    npm --prefix server run dev
    ;;
  test)
    npm --prefix client test 2>/dev/null || true
    npm --prefix server test 2>/dev/null || true
    ;;
  test-client)
    npm --prefix client test
    ;;
  test-server)
    npm --prefix server test
    ;;
  test-coverage)
    npm --prefix client run test:coverage 2>/dev/null || true
    npm --prefix server run test:coverage 2>/dev/null || true
    ;;
  build)
    npm --prefix client run build
    ;;
  migrate)
    npm --prefix server run prisma -- migrate dev
    ;;
  help)
    echo "Commands: install, dev, client, server, test, test-client, test-server, test-coverage, build, migrate"
    ;;
  *)
    echo "Unknown command: $1"
    exit 1
    ;;
esac
