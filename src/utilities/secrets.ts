import * as _ from "lodash";

export const JWT_SECRET = _.defaultTo(process.env.JWT_SECRET, "secret");
