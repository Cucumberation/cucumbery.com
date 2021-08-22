

CREATE USER 'jho5245'@'10.0.0.%' IDENTIFIED BY 'Cucumbery5245';
GRANT ALL PRIVILEGES ON cucumbery.* TO 'jho5245'@'10.0.0.%';

CREATE TABLE `accounts` (
  `id` varchar(64) NOT NULL,
  `name` varchar(64) DEFAULT '익명',
  `keyhash` varchar(1024) NOT NULL,
  `keysalt` varchar(1024) NOT NULL,
  `perm` text DEFAULT '[]',
  `email` varchar(128) DEFAULT NULL,
  `phone` varchar(128) DEFAULT NULL,
  `registerdate` datetime NOT NULL,
  `profileimage` varchar(1024) DEFAULT NULL,
  `sessions` text DEFAULT '[]',
  `ip` text DEFAULT '[]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

CREATE TABLE `cucumbery_builds` (
  `name` varchar(128) NOT NULL,
  `api` varchar(64) NOT NULL,
  `version` varchar(64) NOT NULL,
  `type` varchar(64) NOT NULL,
  `filepath` mediumtext NOT NULL,
  `builddate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;