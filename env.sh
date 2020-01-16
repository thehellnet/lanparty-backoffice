#!/bin/bash

NODE_HOME="/opt/node";
PATH="./node_modules/.bin:${NODE_HOME}/bin:${PATH}";

export NODE_HOME
export PATH

if [ -f /lbin/env-sanitize ]; then
    source /lbin/env-sanitize
fi

PROMPT_TAG="LanParty Backoffice"
PS1="\e[1m[\e[33m${PROMPT_TAG}\e[39m]\e[21m ${PS1}"
export PS1
