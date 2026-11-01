import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Use the installed Chrome if Remotion's own headless shell cannot be downloaded.
Config.setConcurrency(4);
