/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const fs = require("fs");

const commonOutputOptions = {
	mode: "tags",
	client: "react-query",
	mock: false,
};

const commonInputOptions = {};

const commonHooks = {
	afterAllFilesWrite: "prettier --write",
};

const baseUrl = "http://localhost:8080/api";
const instanceTemplate = `import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { InterceptorService } from "@shared/services/InterceptorService";

const http = Axios.create();
const interceptorService = new InterceptorService(http);
interceptorService.addRequestInterceptor().addResponseInterceptor();

export const CUSTOM_INSTANCE = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = http({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return promise;
};

export default CUSTOM_INSTANCE;

export interface ErrorType<Error> extends AxiosError<Error> {}
`;

// Create Instances folder
fs.mkdirSync("./src/api/instances", { recursive: true });
let newTemplate = instanceTemplate.replace(/BASE_URL/g, "environment.baseUrl");
newTemplate = newTemplate.replace(/CUSTOM_INSTANCE/g, `instance`);
fs.writeFileSync(`./src/api/instances/index.ts`, newTemplate);
fs.rmSync(`./src/api/services`, { force: true, recursive: true });

const oravalInputs = {
	base: {
		output: {
			...commonOutputOptions,
			target: `src/api/services/index.ts`,
			schemas: `src/api/services/models`,
			override: {
				mutator: {
					path: `src/api/instances/index.ts`,
					name: `instance`,
				},
			},
		},
		input: {
			...commonInputOptions,
			target: `${baseUrl}/docs/swagger.json`,
		},
		hooks: {
			...commonHooks,
		},
	},
};

fs.rmSync("./orval.config.cjs", { force: true });
fs.writeFileSync(
	"./orval.config.cjs",
	`module.exports = ${JSON.stringify(oravalInputs, null, 2)}`
);
