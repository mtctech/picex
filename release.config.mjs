/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
	branches: [
		{
			name: 'master',
		},
		{
			name: 'beta',
			channel: 'beta',
			prerelease: true,
		},
	],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/npm',
		[
			'@semantic-release/github',
			{
				assets: [],
			},
		],
	],
};
