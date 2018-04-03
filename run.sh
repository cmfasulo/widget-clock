#!/bin/bash

cd /home/pi/widget-clock &&
python3 /home/pi/widget-clock/server.py &
chromium-browser  http://localhost:8080
