#!/bin/bash

# Environment setup script
set -e

echo "🔧 Setting up environment..."

# Function to load environment variables
load_env() {
    local env_file="$1"
    if [ -f "$env_file" ]; then
        echo "Loading environment from $env_file"
        export $(cat "$env_file" | grep -v '^#' | xargs)
    else
        echo "⚠️  Environment file $env_file not found"
        echo "💡 Create it from template: cp ${env_file}.example ${env_file}"
        echo "📝 Then edit ${env_file} with your actual values"
        exit 1
    fi
}

# Get environment from command line argument or default to local
ENV=${1:-local}
echo "Environment: $ENV"

# Load environment variables
case $ENV in
    local)
        load_env .env.local
        ;;
    dev)
        load_env .env.dev
        ;;
    prod)
        load_env .env.prod
        ;;
    *)
        echo "Unknown environment: $ENV"
        echo "Usage: $0 [local|dev|prod]"
        exit 1
        ;;
esac

# Set NODE_ENV and APP_ENV
export NODE_ENV=${NODE_ENV:-development}
export APP_ENV=${ENV}

echo "NODE_ENV: $NODE_ENV"
echo "APP_ENV: $APP_ENV"
echo "Environment setup complete ✅"
