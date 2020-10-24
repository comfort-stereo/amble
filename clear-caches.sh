#!/bin/bash

watchman watch-del-all &&
rm -rf $TMPDIR/react-native-packager-cache-* &&
rm -rf $TMPDIR/metro-bundler-cache-* &&
rm -rf node_modules/ client/node_modules/ common/node_modules/ server/node_modules &&
yarn cache clean &&
yarn install --force