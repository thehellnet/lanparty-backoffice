#!/bin/bash

NODE_HOME="/opt/node"
PATH="./node_modules/.bin:${NODE_HOME}/bin:${PATH}"

export NODE_HOME
export PATH

if [ -f /lbin/env-sanitize ]; then
  source /lbin/env-sanitize
fi

PROMPT_TAG="LanParty Backoffice"
PS1="\001\e[1m\002[\001\e[33m\002${PROMPT_TAG}\001\e[39m\002]\001\e[21m\002 ${PS1}"
export PS1
