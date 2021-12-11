# HEAT Stats

A simple script that generates stats about Messenger group chats.

## Prerequisites

You must have [node](https://nodejs.org) and [yarn](https://yarnpkg.com) installed.

## How to generate stats

1. Go to https://www.facebook.com/your_information and click _Download your information_.
2. In the download options use JSON format, low media quality and set date range to All time. In the list below only select Messages.
3. When the download is finished find the relevant group chat in the _inbox_ folder and copy all files with the format _message\_{number}.json_ to the _data_ folder in this project.
4. Run the command: `yarn heat`. The program should output stats in the console and also to the _results.txt_ file.
