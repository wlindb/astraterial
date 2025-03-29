#!/bin/bash

domain="dev.astraterial.com"
subdomain="www.dev.astraterial.com"
profile="lhy-sandbox"
region="eu-central-1"

# Function to display usage
usage() {
    echo "Usage: $0 [-d domain] [-s subdomain] [-p profile] [-r region]"
    exit 1
}

# Parse arguments
while getopts "d:s:p:r:" opt; do
    case $opt in
        d) domain="$OPTARG" ;;
        s) subdomain="$OPTARG" ;;
        p) profile="$OPTARG" ;;
        r) region="$OPTARG" ;;
        *) usage ;;
    esac
done

aws route53 create-hosted-zone \
  --profile $profile \
  --region $region \
  --name $domain \
  --caller-reference $(date +%s)

