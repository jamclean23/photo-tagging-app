#!/usr/bin/env bash
git add dist -f
git commit -m "Pages Push"
git subtree push --prefix dist origin gh-pages