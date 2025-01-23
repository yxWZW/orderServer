/*
Navicat MySQL Data Transfer

Source Server         : demo
Source Server Version : 80030
Source Host           : localhost:3306
Source Database       : pet

Target Server Type    : MYSQL
Target Server Version : 80030
File Encoding         : 65001

Date: 2023-02-07 10:52:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for fond
-- ----------------------------
DROP TABLE IF EXISTS `fond`;
CREATE TABLE `fond` (
  `id` varchar(255) NOT NULL,
  `petid` varchar(255) NOT NULL,
  `hostid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`petid`,`hostid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of fond
-- ----------------------------
INSERT INTO `fond` VALUES ('0c8c2cb0-a38e-11ed-9a26-cdb13773bef6', '61057960-4ab8-11ed-b94e-ab9331f3dbb1', '8d185a10-4471-11ed-95e2-15955fe8a4bc');
INSERT INTO `fond` VALUES ('51131370-a5e2-11ed-9a7c-4d2a256a13e3', '08ac5b50-4ab6-11ed-b94e-ab9331f3dbb1', 'bcba85f0-4ab5-11ed-b94e-ab9331f3dbb1');
INSERT INTO `fond` VALUES ('92878500-a1de-11ed-9ba6-498b44d525f3', '0c2ae5f0-46e0-11ed-bf18-ffa0021d01be', 'bcba85f0-4ab5-11ed-b94e-ab9331f3dbb1');
INSERT INTO `fond` VALUES ('c58765b0-a1de-11ed-b1dd-83ac3c55a845', '0c2ae5f0-46e0-11ed-bf18-ffa0021d01be', 'e7be4370-4ab7-11ed-b94e-ab9331f3dbb1');
INSERT INTO `fond` VALUES ('c9180130-a5e9-11ed-9a7c-4d2a256a13e3', 'ae80d210-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc');
INSERT INTO `fond` VALUES ('cf7bbd30-a38e-11ed-9a26-cdb13773bef6', '71ab3670-4ab7-11ed-b94e-ab9331f3dbb1', '8d185a10-4471-11ed-95e2-15955fe8a4bc');
INSERT INTO `fond` VALUES ('d88b3a40-a38e-11ed-9a26-cdb13773bef6', '3c491df0-4966-11ed-a4ff-6927c496540f', '8d185a10-4471-11ed-95e2-15955fe8a4bc');
INSERT INTO `fond` VALUES ('ddd419b0-a1de-11ed-a77d-931cf74b70a9', '98815ee0-46df-11ed-bf18-ffa0021d01be', 'e7be4370-4ab7-11ed-b94e-ab9331f3dbb1');
INSERT INTO `fond` VALUES ('e3acaeb0-a1de-11ed-a77d-931cf74b70a9', 'bf7ee850-46df-11ed-bf18-ffa0021d01be', 'e7be4370-4ab7-11ed-b94e-ab9331f3dbb1');
INSERT INTO `fond` VALUES ('e9005c40-a1de-11ed-a77d-931cf74b70a9', '66624bd0-46e0-11ed-bf18-ffa0021d01be', 'e7be4370-4ab7-11ed-b94e-ab9331f3dbb1');
INSERT INTO `fond` VALUES ('eb009910-a1de-11ed-a77d-931cf74b70a9', 'fc61a630-46e0-11ed-bf18-ffa0021d01be', 'e7be4370-4ab7-11ed-b94e-ab9331f3dbb1');

-- ----------------------------
-- Table structure for pets
-- ----------------------------
DROP TABLE IF EXISTS `pets`;
CREATE TABLE `pets` (
  `petid` varchar(255) NOT NULL,
  `hostid` varchar(255) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `petname` varchar(255) NOT NULL,
  `petbreed` varchar(255) NOT NULL,
  `petage` int NOT NULL,
  `petsex` varchar(10) NOT NULL,
  `petcategory` varchar(255) NOT NULL,
  `petmessage` varchar(255) NOT NULL,
  `petimg` varchar(255) DEFAULT NULL,
  `collect` tinyint DEFAULT NULL,
  `ctime` varchar(255) NOT NULL,
  `petweight` float(100,2) NOT NULL,
  `petcolor` varchar(255) NOT NULL,
  PRIMARY KEY (`petid`,`hostid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of pets
-- ----------------------------
INSERT INTO `pets` VALUES ('06f9b760-4ab8-11ed-b94e-ab9331f3dbb1', 'e7be4370-4ab7-11ed-b94e-ab9331f3dbb1', '天雪', '仓鼠', '1', '2', '鼠', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638959436.jpeg', null, '1665638976982', '3.88', '白');
INSERT INTO `pets` VALUES ('08ac5b50-4ab6-11ed-b94e-ab9331f3dbb1', 'bcba85f0-4ab5-11ed-b94e-ab9331f3dbb1', '卡卡', '乌鸦', '1', '2', '鸟', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638089810.jpeg', null, '1665638120837', '3.88', '黑');
INSERT INTO `pets` VALUES ('0ae8d390-46e1-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '毛毛', '橘猫', '3', '2', '猫', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216769770.jpeg', null, '1665216788297', '3.89', '棕');
INSERT INTO `pets` VALUES ('0c2ae5f0-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '皮特', '金毛', '5', '1', '犬', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216345817.jpeg', null, '1665216360911', '3.88', '黄');
INSERT INTO `pets` VALUES ('14622e50-4ab8-11ed-b94e-ab9331f3dbb1', 'e7be4370-4ab7-11ed-b94e-ab9331f3dbb1', '冰花', '仓鼠', '1', '2', '鼠', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638984610.jpeg', null, '1665638999477', '3.88', '白');
INSERT INTO `pets` VALUES ('188d5e90-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '苹果', '泰迪', '2', '2', '犬', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216365396.jpeg', null, '1665216381689', '3.88', '黑');
INSERT INTO `pets` VALUES ('18b73840-46e1-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '球球', '橘猫', '2', '1', '猫', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216793678.jpeg', null, '1665216811460', '3.88', '棕');
INSERT INTO `pets` VALUES ('1c7beba0-4ab6-11ed-b94e-ab9331f3dbb1', 'bcba85f0-4ab5-11ed-b94e-ab9331f3dbb1', '虎老', '猫头鹰', '2', '1', '鸟', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638130105.jpeg', null, '1665638154074', '3.88', '黑');
INSERT INTO `pets` VALUES ('22b5a180-4ab8-11ed-b94e-ab9331f3dbb1', 'e7be4370-4ab7-11ed-b94e-ab9331f3dbb1', '小秋', '仓鼠', '2', '1', '鼠', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665639006396.png', null, '1665639023512', '3.88', '白');
INSERT INTO `pets` VALUES ('268480f0-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '罗斯', '哈士奇', '1', '1', '犬', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216386216.jpeg', null, '1665216405119', '3.88', '灰');
INSERT INTO `pets` VALUES ('298e2c40-4ab6-11ed-b94e-ab9331f3dbb1', 'bcba85f0-4ab5-11ed-b94e-ab9331f3dbb1', '豆奇', '鹦鹉', '3', '2', '鸟', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638161328.jpeg', null, '1665638176004', '3.88', '黑');
INSERT INTO `pets` VALUES ('32573cb0-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '贝塔', '金毛', '3', '1', '犬', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216410207.jpeg', null, '1665216424955', '3.88', '棕');
INSERT INTO `pets` VALUES ('38dbb6e0-4ab6-11ed-b94e-ab9331f3dbb1', 'bcba85f0-4ab5-11ed-b94e-ab9331f3dbb1', '小壮', '乌鸦', '2', '1', '鸟', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638185831.jpeg', null, '1665638201678', '3.88', '白');
INSERT INTO `pets` VALUES ('3c491df0-4966-11ed-a4ff-6927c496540f', 'f7a84560-4486-11ed-8786-87386f18e329', '小黄', '黄鹂', '2', '1', '鸟', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665493831727.jpeg', null, '1665493896527', '3.88', '白');
INSERT INTO `pets` VALUES ('3eb7e090-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '祥瑞', '柯基', '2', '2', '犬', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216431674.jpeg', null, '1665216445721', '3.88', '黑');
INSERT INTO `pets` VALUES ('45164a40-4ab8-11ed-b94e-ab9331f3dbb1', '358b8f90-4ab8-11ed-b94e-ab9331f3dbb1', '丹丹', '宠物鱼', '2', '1', '鱼', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665639064907.jpeg', null, '1665639081188', '3.88', '黑');
INSERT INTO `pets` VALUES ('5448f9e0-4ab8-11ed-b94e-ab9331f3dbb1', '358b8f90-4ab8-11ed-b94e-ab9331f3dbb1', '哎奶', '宠物鱼', '1', '1', '鱼', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665639085748.jpeg', null, '1665639106686', '3.88', '灰');
INSERT INTO `pets` VALUES ('5d9acc90-4ab7-11ed-b94e-ab9331f3dbb1', '44370340-4ab7-11ed-b94e-ab9331f3dbb1', '小瑶', '鹦鹉', '2', '2', '鸟', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638667812.jpeg', null, '1665638692826', '3.88', '白');
INSERT INTO `pets` VALUES ('61057960-4ab8-11ed-b94e-ab9331f3dbb1', '358b8f90-4ab8-11ed-b94e-ab9331f3dbb1', '西子', '宠物鱼', '1', '1', '鱼', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665639113149.jpeg', null, '1665639128054', '3.88', '棕');
INSERT INTO `pets` VALUES ('66624bd0-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '大海', '加菲', '3', '1', '猫', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216484465.jpeg', null, '1665216512269', '3.88', '灰');
INSERT INTO `pets` VALUES ('71ab3670-4ab7-11ed-b94e-ab9331f3dbb1', '44370340-4ab7-11ed-b94e-ab9331f3dbb1', '小丫', '白兔', '3', '2', '兔', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638706087.jpeg', null, '1665638726488', '3.88', '黑');
INSERT INTO `pets` VALUES ('768aa8f0-4ab8-11ed-b94e-ab9331f3dbb1', '358b8f90-4ab8-11ed-b94e-ab9331f3dbb1', '贝图', '宠物鱼', '2', '1', '鱼', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665639146332.jpeg', null, '1665639164159', '3.88', '白');
INSERT INTO `pets` VALUES ('7e787ed0-4ab7-11ed-b94e-ab9331f3dbb1', '44370340-4ab7-11ed-b94e-ab9331f3dbb1', '云儿', '白兔', '2', '2', '兔', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638730664.jpeg', null, '1665638747965', '3.88', '黑');
INSERT INTO `pets` VALUES ('889218e0-4ab7-11ed-b94e-ab9331f3dbb1', '44370340-4ab7-11ed-b94e-ab9331f3dbb1', '宝阿', '白兔', '2', '1', '兔', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638751881.jpeg', null, '1665638764910', '3.88', '棕');
INSERT INTO `pets` VALUES ('927e9020-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '旺财', '加菲', '2', '2', '猫', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216564961.jpeg', null, '1665216586274', '3.88', '灰');
INSERT INTO `pets` VALUES ('96af60e0-4ab7-11ed-b94e-ab9331f3dbb1', '44370340-4ab7-11ed-b94e-ab9331f3dbb1', '小墩', '白兔', '2', '1', '兔', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638769692.jpeg', null, '1665638788590', '3.88', '黑');
INSERT INTO `pets` VALUES ('980b3020-4771-11ed-9901-d76f1366cf21', 'f7a84560-4486-11ed-8786-87386f18e329', '咕咕', '白鸽', '2', '1', '鸟', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665278846070.jpeg', null, '1665278872610', '3.88', '白');
INSERT INTO `pets` VALUES ('98815ee0-46df-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '小洛', '泰迪', '2', '2', '犬', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216101405.jpeg', null, '1665216166862', '3.88', '棕');
INSERT INTO `pets` VALUES ('9fca0930-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '洛奇', '短耳猫', '1', '2', '猫', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216591149.jpeg', null, '1665216608579', '3.88', '黑');
INSERT INTO `pets` VALUES ('a50e93e0-4ab7-11ed-b94e-ab9331f3dbb1', '44370340-4ab7-11ed-b94e-ab9331f3dbb1', '扑扑', '灰兔', '2', '1', '兔', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638793793.jpeg', null, '1665638812702', '3.88', '灰');
INSERT INTO `pets` VALUES ('ac5be730-4aba-11ed-b94e-ab9331f3dbb1', 'f7a84560-4486-11ed-8786-87386f18e329', '馒头', '仓鼠', '2', '2', '鼠', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665640000566.jpeg', null, '1665640113443', '3.88', '灰');
INSERT INTO `pets` VALUES ('ae80d210-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '瑞瑞', '玳瑁猫', '2', '1', '猫', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216613426.jpeg', null, '1665216633265', '3.88', '白');
INSERT INTO `pets` VALUES ('b24cedd0-47a7-11ed-815e-23c9cbcf49db', 'f7a84560-4486-11ed-8786-87386f18e329', '小白', '橘猫', '2', '1', '猫', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665301939042.jpeg', null, '1665302109485', '3.88', '棕');
INSERT INTO `pets` VALUES ('b37ba990-4ab7-11ed-b94e-ab9331f3dbb1', '44370340-4ab7-11ed-b94e-ab9331f3dbb1', '嘿包', '黑兔', '1', '2', '兔', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638818106.jpeg', null, '1665638836905', '3.88', '黑');
INSERT INTO `pets` VALUES ('bc998630-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '狂徒', '玳瑁猫', '3', '2', '猫', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216638926.jpeg', null, '1665216656915', '3.88', '灰');
INSERT INTO `pets` VALUES ('bf7ee850-46df-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '布丁', '柯基', '1', '2', '犬', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216216997.jpeg', null, '1665216232277', '3.88', '灰');
INSERT INTO `pets` VALUES ('c713fd40-4ab7-11ed-b94e-ab9331f3dbb1', '44370340-4ab7-11ed-b94e-ab9331f3dbb1', '梅梅', '灰兔', '2', '1', '兔', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638840827.jpeg', null, '1665638869780', '3.88', '白');
INSERT INTO `pets` VALUES ('cc9c7e20-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '橙子', '橘猫', '3', '2', '猫', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216666951.jpeg', null, '1665216683778', '3.88', '黑');
INSERT INTO `pets` VALUES ('d1cc1e60-46df-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '贝贝', '哈士奇', '2', '1', '犬', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216241104.jpeg', null, '1665216262982', '3.88', '棕');
INSERT INTO `pets` VALUES ('d8cd1150-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '吉祥', '黑猫', '2', '1', '猫', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216687693.jpeg', null, '1665216704229', '3.88', '棕');
INSERT INTO `pets` VALUES ('e5db4fc0-46df-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '当当', '哈士奇', '1', '1', '犬', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216281027.jpeg', null, '1665216296636', '3.88', '灰');
INSERT INTO `pets` VALUES ('ee89fcf0-4ab5-11ed-b94e-ab9331f3dbb1', 'bcba85f0-4ab5-11ed-b94e-ab9331f3dbb1', '五奇', '猫头鹰', '2', '1', '鸟', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638013387.jpeg', null, '1665638076991', '3.88', '白');
INSERT INTO `pets` VALUES ('f2ca50f0-46df-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '柚子', '柯基', '2', '2', '犬', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216301923.jpeg', null, '1665216318335', '3.88', '黑');
INSERT INTO `pets` VALUES ('f9d83480-4ab7-11ed-b94e-ab9331f3dbb1', 'e7be4370-4ab7-11ed-b94e-ab9331f3dbb1', '牛啡', '仓鼠', '1', '1', '鼠', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665638940897.jpeg', null, '1665638954952', '3.88', '棕');
INSERT INTO `pets` VALUES ('fc61a630-46e0-11ed-bf18-ffa0021d01be', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '雷神', '暹罗猫', '2', '1', '猫', '我的这只宠物名叫xxx，品种是xxx，它x岁了，是个xxxxxxxx。它的习惯是xxxxxxxxxx，它喜欢xxxxxxx，不喜欢xxxxx。希望这些可以帮助你更好的了解它。', 'https://petimg-addpet.oss-cn-hangzhou.aliyuncs.com/pet/img/1665216714444.jpeg', null, '1665216763923', '3.88', '黑');

-- ----------------------------
-- Table structure for unreadchat
-- ----------------------------
DROP TABLE IF EXISTS `unreadchat`;
CREATE TABLE `unreadchat` (
  `id` varchar(255) NOT NULL,
  `chatlistid` varchar(255) NOT NULL,
  `hostid` varchar(255) NOT NULL,
  `unreadnum` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of unreadchat
-- ----------------------------
INSERT INTO `unreadchat` VALUES ('2ecd5d30-a3a7-11ed-9a26-cdb13773bef60', '2ecd0f10-a3a7-11ed-9a26-cdb13773bef6', 'bcba85f0-4ab5-11ed-b94e-ab9331f3dbb1', '0');
INSERT INTO `unreadchat` VALUES ('2ecd8440-a3a7-11ed-9a26-cdb13773bef61', '2ecd0f10-a3a7-11ed-9a26-cdb13773bef6', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '0');

-- ----------------------------
-- Table structure for userchatlist
-- ----------------------------
DROP TABLE IF EXISTS `userchatlist`;
CREATE TABLE `userchatlist` (
  `chatlistid` varchar(255) NOT NULL,
  `senderid` varchar(255) NOT NULL,
  `receiverid` varchar(255) NOT NULL,
  `ctime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`chatlistid`,`senderid`,`receiverid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of userchatlist
-- ----------------------------
INSERT INTO `userchatlist` VALUES ('2ecd0f10-a3a7-11ed-9a26-cdb13773bef6', 'bcba85f0-4ab5-11ed-b94e-ab9331f3dbb1', '8d185a10-4471-11ed-95e2-15955fe8a4bc', '1675417395841');

-- ----------------------------
-- Table structure for userchatrecord
-- ----------------------------
DROP TABLE IF EXISTS `userchatrecord`;
CREATE TABLE `userchatrecord` (
  `chatrecordid` varchar(255) NOT NULL,
  `chatlistid` varchar(255) NOT NULL,
  `msg` varchar(255) NOT NULL,
  `mtime` varchar(255) NOT NULL,
  `receiverid` varchar(255) NOT NULL,
  `senderid` varchar(255) NOT NULL,
  PRIMARY KEY (`chatrecordid`,`chatlistid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of userchatrecord
-- ----------------------------
INSERT INTO `userchatrecord` VALUES ('331cf0c0-a5e2-11ed-9a7c-4d2a256a13e3', '2ecd0f10-a3a7-11ed-9a26-cdb13773bef6', '你好！', '1675662645705', 'bcba85f0-4ab5-11ed-b94e-ab9331f3dbb1', '8d185a10-4471-11ed-95e2-15955fe8a4bc');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `userpwd` varchar(255) NOT NULL,
  `userimg` varchar(255) DEFAULT NULL,
  `usersign` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('358b8f90-4ab8-11ed-b94e-ab9331f3dbb1', 'momo', '123', 'user_001', '今日份营业汪 ! ! !');
INSERT INTO `users` VALUES ('44370340-4ab7-11ed-b94e-ab9331f3dbb1', '李四', '123', 'user_006', '今日份营业汪 ! ! !');
INSERT INTO `users` VALUES ('8d185a10-4471-11ed-95e2-15955fe8a4bc', '小何同学', '123', 'user_001', '今日份营业汪 ! ! !');
INSERT INTO `users` VALUES ('94c33370-47a5-11ed-815e-23c9cbcf49db', '在下Baby', '123', 'user_001', '今日份营业汪 ! ! !');
INSERT INTO `users` VALUES ('bcba85f0-4ab5-11ed-b94e-ab9331f3dbb1', '张三', '123', 'user_018', '法外狂徒  张三!');
INSERT INTO `users` VALUES ('e7be4370-4ab7-11ed-b94e-ab9331f3dbb1', '1.8坤', '123', 'user_014', '今日份营业汪 ! ! !');
INSERT INTO `users` VALUES ('f7a84560-4486-11ed-8786-87386f18e329', '汪星人', '123', 'user_020', '当只狗真好!');
