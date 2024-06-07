import path from "path";
import fs from "fs";

// 动态获取配置文件路径，这可以通过环境变量或者其他方式来配置
const tailwindConfigPath =
  process.env.TAILWIND_CONFIG_PATH || "tailwind.config.ts";

/**
 * 检查配置文件是否存在，如果不存在则抛出一个错误。
 * 这样可以提前捕获并处理问题，避免在后续的处理过程中发生不可预知的错误。
 */
if (!fs.existsSync(tailwindConfigPath)) {
  throw new Error(
    `Tailwind CSS configuration file not found at: ${tailwindConfigPath}`
  );
}

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: { config: tailwindConfigPath },
  },
};

// 导出配置
export default config;
