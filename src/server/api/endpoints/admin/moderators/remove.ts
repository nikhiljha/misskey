import $ from 'cafy';
import ID, { transform } from '../../../../../misc/cafy-id';
import define from '../../../define';
import User from '../../../../../models/user';

export const meta = {
	desc: {
		'ja-JP': '指定したユーザーをモデレーター解除します。',
		'en-US': 'Unmark a user as moderator.'
	},

	requireCredential: true,
	requireAdmin: true,

	params: {
		userId: {
			validator: $.type(ID),
			transform: transform,
			desc: {
				'ja-JP': '対象のユーザーID',
				'en-US': 'The user ID'
			}
		},
	}
};

export default define(meta, (ps) => new Promise(async (res, rej) => {
	const user = await User.findOne({
		_id: ps.userId
	});

	if (user == null) {
		return rej('user not found');
	}

	await User.update({
		_id: user._id
	}, {
		$set: {
			isModerator: false
		}
	});

	res();
}));
