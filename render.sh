#!/bin/sh
# Remotion's bundled encoder needs macOS 15+, so render frames and encode
# them with the standalone ffmpeg in ./bin instead.
set -e
cd "$(dirname "$0")"
rm -rf frames
npx remotion render Intro frames --sequence --image-format=jpeg --jpeg-quality=95
./bin/ffmpeg -y -loglevel error -framerate 30 -i frames/element-%03d.jpeg \
  -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart ../hello-react/public/intro.mp4
rm -rf frames
echo "Rendered ../hello-react/public/intro.mp4"
