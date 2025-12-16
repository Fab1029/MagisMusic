#!/bin/bash
docker compose down -v
HOST_IP=$(hostname -I | awk '{print $1}') docker compose up -d