const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const buildPath = "dist";
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    target: ["browserslist"],
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, buildPath),
      publicPath: isProduction ? "" : "/",
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "cheap-module-source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-env",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: cssModuleRegex,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  mode: "local",
                  localIdentName: "[name]_[local]_[hash:base64]",
                },
                esModule: false,
              },
            },
            "postcss-loader",
          ],
          exclude: /node_modules/,
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: {
                    removeViewBox: false,
                  },
                },
                titleProp: true,
                ref: true,
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
        {
          test: /\.(png|jpe?g|gif|ttf|woff2?|eot)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./src/public",
            to: "./",
          },
          {
            from: "./src",
            globOptions: {
              ignore: [
                "**/*.js",
                "**/*.ts",
                "**/*.tsx",
                "**/*.css",
                "**/*.module.css",
                "**/*.d.ts",
                "**/*.html",
                "**/*.svg",
                "**/*.ttf",
                "**/*.env",
              ],
            },
            to: "./",
          },
        ],
      }),
      new Dotenv(),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, buildPath),
      },
      hot: true,
      host: "0.0.0.0",
      port: 3000,
    },
  };
};
