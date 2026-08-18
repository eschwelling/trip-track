#!/usr/bin/env bash
set -o errexit

bundle install
yarn install --frozen-lockfile
bin/rails assets:precompile   # vite_rails hooks in here and runs the Vite build
bin/rails db:migrate
bin/rails db:seed             # idempotent: loads MBTA lines/stops only when tables are empty
