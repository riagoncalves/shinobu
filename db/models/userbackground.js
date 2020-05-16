'use strict';
module.exports = (sequelize) => {
	const UserBackground = sequelize.define('UserBackground', {
	}, {});
	UserBackground.associate = function(models) {
		UserBackground.belongsTo(models.User, { as: 'User' });
		UserBackground.belongsTo(models.Background, { as: 'Background' });
	};
	return UserBackground;
};