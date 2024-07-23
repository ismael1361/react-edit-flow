import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { dts } from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import scss from "rollup-plugin-scss";
import path from "path";

const packageJson = require("./package.json");

export default [
	{
		input: "src/index.tsx",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true,
				name: packageJson.name,
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			peerDepsExternal(),
			resolve({
				browser: true, // Adicione esta linha para garantir que está resolvendo para o navegador
				preferBuiltins: false,
			}),
			commonjs({
				include: "node_modules/**", // Inclui node_modules para resolver require
			}),
			typescript({ tsconfig: "./tsconfig.json" }),
			scss({
				output: "dist/styles.css", // caminho onde o CSS será gerado
				outputStyle: "compressed",
				includePaths: ["node_modules"],
			}),
			terser(),
		],
		external: ["react", "react-dom"],
	},
	{
		input: path.resolve(path.dirname(packageJson.module), "types/index.d.ts"),
		output: [{ file: packageJson.types, format: "esm" }],
		external: [/\.css$/, /\.scss$/],
		plugins: [dts()],
	},
];
