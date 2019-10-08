#!/usr/bin/env bash
URL="https://abooks.info/dzhon-ronald-rujel-tolkien-vozvrashhenie-gosudarja-konec-tretej-jepohi/"
PLAYLISTURL=curl "${URL}" | grep data-tracks-url
echo ${PLAYLISTURL}
