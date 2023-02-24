/*
 Navicat MySQL Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : localhost:3306
 Source Schema         : vaccines

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 05/04/2022 11:23:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '简介',
  `addr` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '地址',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `time` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '医疗机构表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, '第六人民医院', '18500000000', '<p>朝阳区第六人民医院</p>', '朝阳区第六人民医院', 'http://localhost:5000/files/202233dfab479d49f3844f45d8cbdc032b381d.jpg', '2022-04-03 12:30:07');
INSERT INTO `admin` VALUES (2, '第七人民医院', '18500000000', '<p>朝阳区第六人民医院</p>', '朝阳区第六人民医院', 'http://localhost:5000/files/202233b89807f68808b1ec345a18a9774d388d.jpg', '2022-04-03 12:36:24');

-- ----------------------------
-- Table structure for commits
-- ----------------------------
DROP TABLE IF EXISTS `commits`;
CREATE TABLE `commits`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NULL DEFAULT NULL COMMENT '关联用户',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '评论',
  `tid` int(11) NULL DEFAULT NULL COMMENT '关联交友圈',
  `time` timestamp(0) NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '评论表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of commits
-- ----------------------------
INSERT INTO `commits` VALUES (1, 1, '12311阿斯顿发大水发大厦附件的射流风机爱德克斯拉多久射流风机', 1, '2022-04-01 11:44:55');
INSERT INTO `commits` VALUES (3, 1, '121', 2, '2022-04-02 23:20:21');
INSERT INTO `commits` VALUES (4, 1, '121', 3, '2022-04-02 23:53:19');
INSERT INTO `commits` VALUES (5, 1, '12111', 4, '2022-04-04 17:32:35');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '标题',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片',
  `time` timestamp(0) NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '资讯表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (1, '这是第一条资讯', '新冠疫苗资讯', '<p><span style=\"font-weight: bold; font-style: italic;\">大沙发大沙发大沙发大ad发大水</span></p>', 'http://localhost:5000/files/202234155a6ba0b57d59248f2bc5a0f105da83.jpg', '2022-04-04 21:28:44');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NULL DEFAULT NULL COMMENT '关联医疗结构',
  `vid` int(11) NULL DEFAULT NULL COMMENT '关联疫苗',
  `booktime` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '预约时间段',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态 未完成 已完成 已退 已作废',
  `day` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '预约日期',
  `time` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '时间',
  `uid` int(11) NULL DEFAULT NULL COMMENT '关联用户id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '预约表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 1, 1, '09:00-10:00', '已完成', '2022-04-05', '2022-04-04 18:01:11', 1);
INSERT INTO `orders` VALUES (3, 1, 1, '09:00-10:00', '已完成', '2022-03-23', '2022-03-22 22:54:22', 1);
INSERT INTO `orders` VALUES (5, 1, 1, '09:00-10:00', '已退', '2022-04-04', '2022-04-04 17:03:16', 1);
INSERT INTO `orders` VALUES (6, 1, 1, '09:00-10:00', '已退', '2022-04-05', '2022-04-04 18:19:41', 1);
INSERT INTO `orders` VALUES (7, 1, 1, '17:00-18:00', '已作废', '2022-04-04', '2022-04-04 18:19:10', 1);
INSERT INTO `orders` VALUES (8, 1, 1, '11:00-12:00', '已完成', '2022-04-05', '2022-04-04 18:22:33', 1);

-- ----------------------------
-- Table structure for talk
-- ----------------------------
DROP TABLE IF EXISTS `talk`;
CREATE TABLE `talk`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `imgs` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '图片',
  `uid` int(11) NULL DEFAULT NULL COMMENT '关联用户id',
  `time` timestamp(0) NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '交流圈表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of talk
-- ----------------------------
INSERT INTO `talk` VALUES (4, 'heheda ', 'http://localhost:5000/files/202234b64e0a94f6883248fc93f86a00feb6c4.jpg,http://localhost:5000/files/202234a9660bbdac2081752b88941fe5df5f3a.jpg', 1, '2022-04-04 17:32:28');
INSERT INTO `talk` VALUES (5, '呵呵', 'http://localhost:5000/files/2022340d422389d14854631c301be74d55b7d1.jpg', 1, '2022-04-04 18:19:20');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账号',
  `pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `time` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '时间',
  `cardid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '身份证号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'user', 'user', '卢本伟1', '18500000000', 'http://localhost:5000/files/20223498fcc889e161197080aa27a19b938617.jpg', '2022-04-04 15:33:43', '451111111111111111');

-- ----------------------------
-- Table structure for vaccines
-- ----------------------------
DROP TABLE IF EXISTS `vaccines`;
CREATE TABLE `vaccines`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '疫苗名称',
  `addr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地点',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '简介',
  `timelist` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '可预约时间段,隔开',
  `num` int(11) NULL DEFAULT NULL COMMENT '每时间段数量',
  `aid` int(11) NULL DEFAULT NULL COMMENT '关联医疗机构',
  `time` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '时间',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '疫苗表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vaccines
-- ----------------------------
INSERT INTO `vaccines` VALUES (1, '新冠疫苗', '第六人民医院地址', '<p>这是新冠疫苗</p>', '09:00-10:00,11:00-12:00,15:00-16:00,17:00-18:00', 20, 1, '2022-04-04 21:29:56', '第一针');
INSERT INTO `vaccines` VALUES (3, '九价育苗', '第六人民医院地址', '<p>这是新冠疫苗</p>', '09:00-10:00,11:00-12:00,15:00-16:00,17:00-18:00', 20, 1, '2022-04-04 21:30:00', '第二针');
INSERT INTO `vaccines` VALUES (4, '新冠疫苗', '第六人民医院地址', '<p>这是新冠疫苗</p>', '09:00-10:00,11:00-12:00,15:00-16:00,17:00-18:00', 20, 2, '2022-04-04 21:30:04', '第一针');

SET FOREIGN_KEY_CHECKS = 1;
