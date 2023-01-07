module.exports = (sequelize, DataTypes) => {
    // creating posts table
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNULL: false,

        },
        postText: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    };

    Posts.associate = (models) => {
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        });
    };

    return Posts;
}