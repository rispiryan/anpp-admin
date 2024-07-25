module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"subject-case": [2, "never", ["start-case", "pascal-case"]],
		"scope-case": [2, "always", ["camel-case", "pascal-case", "kebab-case"]],
		"type-enum": [
			2,
			"always",
			[
				"build",
				"chore",
				"ci",
				"docs",
				"feat",
				"fix",
				"perf",
				"refactor",
				"revert",
				"style",
				"test",
				"hotfix"
			],
		],
	},
	prompt: {
		questions: {
			type: {
				enum: {
					hotfix: {
						description: "A hotfix",
						title: "Hotfixes",
						emoji: "🔥",
					},
				},
			},
		},
	},
};
