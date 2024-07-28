import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import scss from "rollup-plugin-scss";
import fs from "fs";

import packageJson from "./dist/package.json" assert { type: "json" };

fs.rmdirSync("dist/cjs", { recursive: true });
fs.rmdirSync("dist/esm", { recursive: true });
fs.rmdirSync("dist/types", { recursive: true });

fs.copyFileSync("./README.md", "./dist/README.md");

export default [
	{
		input: "src/lib/index.tsx",
		output: {
			file: "dist/cjs/index.js",
			format: "cjs",
			name: packageJson.name,
			sourceMap: true,
		},
		plugins: [
			peerDepsExternal(),
			resolve({
				extensions: [".js", ".jsx", ".ts", ".tsx"],
				browser: true, // para importar dependências que são para o navegador
				preferBuiltins: false, // para importar dependências que são para o navegador
			}),
			commonjs(),
			typescript({ tsconfig: "src/lib/tsconfig.json", sourceMap: true }),
			scss({
				fileName: "styles.css", // caminho onde o CSS será gerado
				outputStyle: "compressed", // estilo de saída
				includePaths: ["node_modules"],
			}),
		],
		external: ["react", "react-dom"],
	},
	{
		input: "src/lib/index.tsx",
		output: {
			file: "dist/esm/index.js",
			format: "esm",
			name: packageJson.name,
			sourceMap: true,
		},
		plugins: [
			peerDepsExternal(),
			resolve({
				extensions: [".js", ".jsx", ".ts", ".tsx"],
				browser: true, // para importar dependências que são para o navegador
				preferBuiltins: false, // para importar dependências que são para o navegador
			}),
			commonjs(),
			typescript({ tsconfig: "src/lib/tsconfig.json", sourceMap: true, declaration: true, declarationDir: "dist/esm/types" }),
			scss({
				fileName: "styles.css", // caminho onde o CSS será gerado
				outputStyle: "compressed", // estilo de saída
			}),
		],
		external: ["react", "react-dom", "@emotion/react", "@emotion/styled", "@mdi/js", "@mui/material", "@mui/icons-material"],
	},
	{
		input: "dist/esm/types/index.d.ts",
		output: [{ file: "dist/types/index.d.ts", format: "esm" }],
		external: [/\.css$/, /\.scss$/],
		plugins: [dts()],
	},
];
