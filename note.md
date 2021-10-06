# spring boot 开发准备

- 工具 : Maven

1. 流程:
    - 下载Maven(.zip)
    - 命令
        + mvn -v
        + mvn compile
        + mvn test
        + mvn package ---> war包
        + mvn clean
        + mvn install  安装jar包到本地仓库
    - 备注:以上命令基本不用,它集成到eclipse里了
    - maven的坐标
        + 构建:依赖和插件等在maven中叫构建.每个构件有它唯一的标识,也叫坐标
        + 坐标的组成:goupId,argifactId,version
        + groupId:公司域名+项目名,比如:com.ck.stuydyMaven
        + argifactId:项目名,如:studyMaven
        + version:版本
    - maven的仓库
        + 管理依赖,有两种,远程(中央仓库)和本地   
        + 中央仓库地址:https://repo.maven.apache.org/maven2,这里存的所有java的开源jar包
        + 镜像仓库:http://maven.aliyun.com/nexus/content/groups/public/ 
        + 配置镜像仓库:sudo vi settings.xml 
        + 配置本地仓库:<localrepository>


2. eclipse中安装maven插件
- 下载eclipse-maven3-plugin解压发到eclipse 的dropin文件  




## sms table
- sys_user: id
- sys_user_role: id,user_id,role,id
- sys_role: id
- sys_menu: id
- sys_role_menu: id,role_id,menu_id

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `name` varchar(100),
  `passworld` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `status` int(1) NOT NULL,
  `create_uer` varchar(100),
  `create_time` varchar(100),
  `update_uer` varchar(100),
  `update_time` varchar(100),
  `del_flag` int(1) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `remark` varchar(100),
  `createuer` varchar(100),
  `createtime` varchar(100),
  `updateuer` varchar(100),
  `updatetime` varchar(100)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL ,
  `name` varchar(100) NOT NULL,
  `url` varchar(100),
  `perms` varchar(100),
  `icon` varchar(100),
  `createuer` varchar(100),
  `createtime` varchar(100),
  `updateuer` varchar(100),
  `updatetime` varchar(100),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sys_role_id` int(11) NOT NULL ,
  `sys_menu_id` int(11) NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

 

DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` int(11) NOT NULL,
  `sys_user_id` int(11) NOT NULL ,
  `sys_role_id` int(11) NOT NULL 
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

BEGIN;
INSERT INTO `sys_user_role` VALUES 
(1,1,1),
(8,4,2),
(10,5,2),
(11,2,2),
(13,6,2);
COMMIT;






SET FOREIGN_KEY_CHECKS = 1;
