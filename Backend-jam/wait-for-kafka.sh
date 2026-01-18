#!/bin/bash
set -e

host="$1"
port="$2"
shift 2

echo "Esperando a Kafka en $host:$port..."
while ! nc -z $host $port; do
  sleep 1
done

echo "Kafka listo, arrancando backend-jam..."
exec "$@"
