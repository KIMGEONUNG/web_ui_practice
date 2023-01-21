#!/bin/bash

find * -maxdepth 1 -type d > targets.txt
for p in $(find * -maxdepth 1 -type d)
do
  echo $p/* | xargs -n1 > targets_$p.txt
done
