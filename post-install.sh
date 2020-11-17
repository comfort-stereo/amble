#!/bin/bash

# Temporary patch so @react-navigation/bottom-tabs compiles on web.
sed -i '' 's/, shouldUseActivityState/ /' 'node_modules/@react-navigation/bottom-tabs/lib/module/views/ResourceSavingScene.js'