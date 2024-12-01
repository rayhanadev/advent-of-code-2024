import sade from "sade";
import { version } from "../package.json";

import { run } from "./utils/run";
import { scaffold } from "./utils/scaffold";

const cli = sade("aoc24");
cli.version(version);

cli.command("run [day]", "Run a day's solution").action(run);
cli.command("scaffold", "Scaffold a new day").action(scaffold);

cli.parse(process.argv);
