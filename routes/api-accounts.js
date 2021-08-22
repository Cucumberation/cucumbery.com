const router = require('express').Router();
const accounts = require('../modules/accounts');
const log = require('../modules/log');
const APIMessage = require("./message.json");

const Account = accounts.Account;



/**
 * @desc Get accounts data (id, name, permissions)
 * @permission default: accounts.all.get
 */
router.get('/', (req, res) => {

  if (!accounts.isLogin(req)) {
    res.status(401).send({ message: APIMessage.auth401 });
    return;
  }

  var client = accounts.getClient(req);

  if (!accounts.hasPermission(client, "accounts.all.get")) {
    res.status(403).send({ message: APIMessage.permission403 });
    return;
  }

  var where = false;
  var size = 20;
  var page = 1;
  var and = false;
  var count = false;

  if (req.query.id) {
    var id = req.query.id;
    if (!where) { where = new Object() }
    where.id = id;
  }
  if (req.query.name) {
    var name = req.query.name;
    if (!where) { where = new Object() }
    where.name = name;
  }
  if (req.query.permission) {
    var permission = req.query.permission;
    if (!where) { where = new Object() }
    where.perm = permission;
  }
  if (req.query.size) {
    size = req.query.size * 1;
  }
  if (req.query.page) {
    page = req.query.page * 1;
  }
  if (req.query.and) {
    and = (req.query.and === 'true');
  }
  if (req.query.count) {
    count = (req.query.count === 'true');
  }

  accounts.getAccounts(size, page, where, and, count).then((accounts) => {
    res.status(200).send({ message: APIMessage.default200, data: accounts });
    return;
  }).catch((error) => {
    log.error(error);
    res.status(500).send({ message: APIMessage.default500 });
    return;
  });

});

/**
 * @desc Get account data (*)
 * @permission others: accounts.id.get.others
 */
router.get('/:id', (req, res) => {

  if (!accounts.isLogin(req)) {
    res.status(401).send({ message: APIMessage.auth401 });
    return;
  }

  var client = accounts.getClient(req);

  var id = req.params.id;
  if (id == "me") { id = client.id; }

  if (client.id != id) {
    if (!accounts.hasPermission(client, "accounts.id.get.others")) {
      res.status(403).send({ message: APIMessage.permission403 });
      return;
    }
  }

  var account = new Account(id);
  account.pull().then(() => {
    res.send({
      message: APIMessage.default200, data: {
        id: account.id,
        name: account.name,
        permissions: account.permissions,
        email: account.email,
        phone: account.phone
      }
    });
    return;
  }).catch((error) => {
    if (error == null) {
      res.status(404).send({ message: APIMessage.account404 });
      return;
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});

/**
 * @desc Create account
 */
router.post('/:id', (req, res) => {

  if (accounts.isLogin(req)) {
    res.status(409).send({ message: APIMessage.default409 });
    return;
  }
  if (!req.body) {
    res.status(400).send({ message: APIMessage.default400 });
    return;
  }

  var client = accounts.getClient(req);

  var id = req.params.id;

  var account = new Account(id);

  account.pull().then(() => {
    res.status(409).send({ message: APIMessage.default409 });
    return;
  }).catch((error) => {
    if (error == null) {

      var key = req.body.key + "";

      var name = req.body.name + "";
      var email = req.body.email + "";
      var phone = req.body.phone + "";

      if (!key) {
        res.status(400).send({ message: APIMessage.default400 });
        return;
      }

      id = id.slice(0, 24);

      if (!name || name == "") {
        name = "👻";
      }
      else {
        name = name.slice(0, 24);
      }

      if (req.body.email || req.body.email == "") {
        email = email.slice(0, 64);
        email = email.toLowerCase();
        email = email.replace(/([^a-z0-9_.@\-])/g, "");
        account.email = email;
      }
      else {
        email = "";
      }

      if (req.body.phone || req.body.phone == "") {
        var phone = req.body.phone;
        phone = phone.slice(0, 24);
        phone = phone.replace(/([^0-9_. \-])/g, "");
        account.phone = phone;
      }
      else {
        phone = "";
      }

      account.name = name;
      account.email = email;
      account.phone = phone;

      account.insert(key).then(() => {
        account.push().then(() => {
          account.pullSessions().then(() => {
            account.createSession(req, client);
            account.pushSessions().then(() => {
              res.send({ message: APIMessage.default200, data: account });
              return;
            }).catch((error) => {
              log.error(error);
              res.status(500).send({ message: APIMessage.default500 });
              return;
            });
          }).catch((error) => {
            log.error(error);
            res.status(500).send({ message: APIMessage.default500 });
            return;
          });
        }).catch((error) => {
          log.error(error);
          res.status(500).send({ message: APIMessage.default500 });
          return;
        });
      }).catch((error) => {
        log.error(error);
        res.status(500).send({ message: APIMessage.default500 });
        return;
      });
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});

/**
 * @desc Modify account data
 * @permission others: accounts.id.patch.others
 */
router.patch('/:id', (req, res) => {

  if (!accounts.isLogin(req)) {
    res.status(401).send({ message: APIMessage.auth401 });
    return;
  }
  if (!req.body) {
    res.status(400).send({ message: APIMessage.default400 });
    return;
  }

  var client = accounts.getClient(req);

  var id = req.params.id;
  if (id == "me") { id = client.id; }

  if (client.id != id) {
    if (!accounts.hasPermission(client, "accounts.id.patch.others")) {
      res.status(403).send({ message: APIMessage.permission403 });
      return;
    }
  }

  var account = new Account(id);
  account.pull().then(() => {
    if (req.body.name) {
      var name = req.body.name + "";
      name = name.slice(0, 24);
      if (!name || name == "") {
        name = "👻";
      }
      account.name = name;
    }
    if (req.body.email || req.body.email == "") {
      var email = req.body.email + "";
      email = email.slice(0, 64);
      email = email.toLowerCase();
      email = email.replace(/([^a-z0-9_.@\-])/g, "");
      account.email = email;
    }
    if (req.body.phone || req.body.phone == "") {
      var phone = req.body.phone + "";
      phone = phone.slice(0, 24);
      phone = phone.replace(/([^0-9_. \-])/g, "");
      account.phone = phone;
    }

    account.push().then(() => {
      res.send({ message: APIMessage.default200 });
      return;
    }).catch((error) => {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    });

  }).catch((error) => {
    if (error == null) {
      res.status(404).send({ message: APIMessage.account404 });
      return;
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});

/**
 * @desc Modify account key
 * @permission others: accounts.key.patch.others
 */
router.patch('/:id/key', (req, res) => {

  if (!accounts.isLogin(req)) {
    res.status(401).send({ message: APIMessage.auth401 });
    return;
  }
  if (!req.body) {
    res.status(400).send({ message: APIMessage.default400 });
    return;
  }

  console.log(req.body);

  var client = accounts.getClient(req);

  var id = req.params.id;
  if (id == "me") { id = client.id; }

  if (client.id != id) {
    if (!accounts.hasPermission(client, "accounts.key.patch.others")) {
      res.status(403).send({ message: APIMessage.permission403 });
      return;
    }
  }

  var key = req.body.key;
  var newkey = req.body.newkey;

  if (!key || !newkey) {
    res.status(400).send({ message: APIMessage.default400 });
    return;
  }

  var account = new Account(id);
  account.pull().then(() => {
    account.verify(key).then(() => {
      account.crypt(newkey).then((hash) => {
        account.pushKeyHash(hash).then(() => {
          account.pullSessions().then(() => {
            account.deleteSessions().then(() => {
              account.pushSessions().then(() => {
                res.send({ message: APIMessage.default200, data: account });
                return;
              }).catch((error) => {
                log.error(error);
                res.status(500).send({ message: APIMessage.default500 });
                return;
              });
            }).catch((error) => {
              log.error(error);
              res.status(500).send({ message: APIMessage.default500 });
              return;
            });
          }).catch((error) => {
            log.error(error);
            res.status(500).send({ message: APIMessage.default500 });
            return;
          });
        }).catch((error) => {
          log.error(error);
          res.status(500).send({ message: APIMessage.default500 });
          return;
        });
      }).catch((error) => {
        log.error(error);
        res.status(500).send({ message: APIMessage.default500 });
        return;
      });
    }).catch((error) => {
      if (error == false) {
        res.status(401).send({ message: APIMessage.auth401 });
      }
      else if (error == null) {
        res.status(404).send({ message: APIMessage.account404 });
      }
      else {
        log.error(error);
        res.status(500).send({ message: APIMessage.default500 });
      }
      return;
    });
  }).catch((error) => {
    if (error == null) {
      res.status(404).send({ message: APIMessage.account404 });
      return;
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});



/**
 * @desc Get account sessions
 * @permission others: accounts.sessions.get.others
 */
router.get('/:id/sessions', (req, res) => {

  if (!accounts.isLogin(req)) {
    res.status(401).send({ message: APIMessage.auth401 });
    return;
  }

  var client = accounts.getClient(req);

  var id = req.params.id;
  if (id == "me") { id = client.id; }

  if (client.id != id) {
    if (!accounts.hasPermission(client, "accounts.sessions.get.others")) {
      res.status(403).send({ message: APIMessage.permission403 });
      return;
    }
  }

  var account = new Account(id);
  account.pull().then(() => {
    account.pullSessions().then(() => {
      var sessions = [];
      for (var session of account.sessions) {
        var sessionData = {
          id: session.id,
          client: session.clientData
        };
        if (session.id == req.sessionID) {
          sessionData.current = true;
        }
        sessions.push(sessionData)
      }
      res.send({ message: APIMessage.default200, data: sessions });
      return;
    }).catch((error) => {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    });
  }).catch((error) => {
    if (error == null) {
      res.status(404).send({ message: APIMessage.account404 });
      return;
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});

/**
 * @desc Create account session => login
 */
router.post('/:id/sessions', (req, res) => {

  if (accounts.isLogin(req)) {
    res.status(409).send({ message: APIMessage.default409 });
    return;
  }
  if (!req.body) {
    res.status(400).send({ message: APIMessage.default400 });
    return;
  }

  var client = accounts.getClient(req);

  var id = req.params.id;
  var key = req.body.key;

  if (!key) {
    res.status(400).send({ message: APIMessage.default400 });
    return;
  }

  var account = new Account(id);
  account.pull().then(() => {
    account.verify(key).then(() => {
      account.pullSessions().then(() => {
        account.createSession(req, client);
        account.pushSessions().then(() => {
          log.info("Account login: " + account.id + " (" + client.ip + ", " + req.sessionID + ")");
          res.send({ message: APIMessage.default200, data: account });
          return;
        }).catch((error) => {
          log.error(error);
          res.status(500).send({ message: APIMessage.default500 });
          return;
        });
      }).catch((error) => {
        log.error(error);
        res.status(500).send({ message: APIMessage.default500 });
        return;
      });
    }).catch((error) => {
      if (error == false) {
        res.status(401).send({ message: APIMessage.auth401 });
      }
      else if (error == null) {
        res.status(404).send({ message: APIMessage.account404 });
      }
      else {
        log.error(error);
        res.status(500).send({ message: APIMessage.default500 });
      }
      return;
    });
  }).catch((error) => {
    if (error == null) {
      res.status(404).send({ message: APIMessage.account404 });
      return;
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});

/**
 * @desc Delete account session => logout
 * @permission others: accounts.sessions.delete.others
 */
router.delete('/:id/sessions', (req, res) => {

  if (!accounts.isLogin(req)) {
    res.status(401).send({ message: APIMessage.auth401 });
    return;
  }

  var client = accounts.getClient(req);

  var id = req.params.id;
  if (id == "me") { id = client.id; }

  if (client.id != id) {
    if (!accounts.hasPermission(client, "accounts.sessions.delete.others")) {
      res.status(403).send({ message: APIMessage.permission403 });
      return;
    }
  }

  var sid = req.sessionID;
  if (req.body && req.body.sid) {
    sid = req.body.sid;
  }

  var account = new Account(id);
  account.pull().then(() => {
    account.pullSessions().then(() => {
      if (sid == req.sessionID) {
        req.session.destroy();
      }
      account.deleteSession(sid).then(() => {
        account.pushSessions().then(() => {
          log.info("Account logout: " + account.id + " (" + client.ip + ", " + sid + ")");
          res.send({ message: APIMessage.default200, data: account });
          return;
        }).catch((error) => {
          log.error(error);
          res.status(500).send({ message: APIMessage.default500 });
          return;
        });
      });
    }).catch((error) => {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    });
  }).catch((error) => {
    if (error == null) {
      res.status(404).send({ message: APIMessage.account404 });
      return;
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});



/**
 * @desc Get account permissions
 * @permission others: accounts.permissions.get.others
 */
router.get('/:id/permissions', (req, res) => {

  if (!accounts.isLogin(req)) {
    res.status(401).send({ message: APIMessage.auth401 });
    return;
  }

  var client = accounts.getClient(req);

  var id = req.params.id;
  if (id == "me") { id = client.id; }

  if (client.id != id) {
    if (!accounts.hasPermission(client, "accounts.permissions.get.others")) {
      res.status(403).send({ message: APIMessage.permission403 });
      return;
    }
  }

  var account = new Account(id);
  account.pull().then(() => {
    res.send({ message: APIMessage.default200, data: account.permissions });
    return;
  }).catch((error) => {
    if (error == null) {
      res.status(404).send({ message: APIMessage.account404 });
      return;
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});

/**
 * @desc Add account permissions
 * @permission default: accounts.permissions.put
 * @permission others: accounts.permissions.put.others
 */
router.put('/:id/permissions', (req, res) => {

  if (!accounts.isLogin(req)) {
    res.status(401).send({ message: APIMessage.auth401 });
    return;
  }
  if (!req.body) {
    res.status(400).send({ message: APIMessage.default400 });
    return;
  }

  var client = accounts.getClient(req);

  if (!accounts.hasPermission(client, "accounts.permissions.put")) {
    res.status(403).send({ message: APIMessage.permission403 });
    return;
  }

  var id = req.params.id;
  if (id == "me") { id = client.id; }

  if (client.id != id) {
    if (!accounts.hasPermission(client, "accounts.permissions.put.others")) {
      res.status(403).send({ message: APIMessage.permission403 });
      return;
    }
  }

  var account = new Account(id);
  account.pull().then(() => {
    if (req.body.permission) {
      var perm = req.body.permission;
      perm = perm.replace(/[^a-z0-9.-]/, "");
      if (!account.permissions.includes(perm)) {
        account.permissions.push(perm);
      }
    }
    else if (req.body.permissions) {
      var perms = req.body.permissions;
      for (var perm of perms) {
        perm = perm.replace(/[^a-z0-9.-]/, "");
        if (!account.permissions.includes(perm)) {
          account.permissions.push(perm);
        }
      }
    }
    account.push().then(() => {
      res.status(200).send({ message: APIMessage.default200 });
    }).catch((error) => {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    });
  }).catch((error) => {
    if (error == null) {
      res.status(404).send({ message: APIMessage.account404 });
      return;
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});

/**
 * @desc Delete account permissions
 * @permission default: accounts.permissions.delete
 * @permission others: accounts.permissions.delete.others
 */
router.delete('/:id/permissions', (req, res) => {

  if (!accounts.isLogin(req)) {
    res.status(401).send({ message: APIMessage.auth401 });
    return;
  }
  if (!req.body) {
    res.status(400).send({ message: APIMessage.default400 });
    return;
  }

  var client = accounts.getClient(req);

  if (!accounts.hasPermission(client, "accounts.permissions.delete")) {
    res.status(403).send({ message: APIMessage.permission403 });
    return;
  }

  var id = req.params.id;
  if (id == "me") { id = client.id; }

  if (client.id != id) {
    if (!accounts.hasPermission(client, "accounts.permissions.delete.others")) {
      res.status(403).send({ message: APIMessage.permission403 });
      return;
    }
  }

  var account = new Account(id);
  account.pull().then(() => {
    if (req.body.permission) {
      var perm = req.body.permission;
      perm = perm.replace(/[^a-z0-9.-]/, "");
      if (account.permissions.includes(perm)) {
        var index = account.permissions.indexOf(perm);
        account.permissions.splice(index, 1);
      }
    }
    else if (req.body.permissions) {
      var perms = req.body.permissions;
      for (var perm of perms) {
        perm = perm.replace(/[^a-z0-9.-]/, "");
        if (!account.permissions.includes(perm)) {
          var index = account.permissions.indexOf(perm);
          account.permissions.splice(index, 1);
        }
      }
    }
    account.push().then(() => {
      res.status(200).send({ message: APIMessage.default200 });
    }).catch((error) => {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    });
  }).catch((error) => {
    if (error == null) {
      res.status(404).send({ message: APIMessage.account404 });
      return;
    }
    else {
      log.error(error);
      res.status(500).send({ message: APIMessage.default500 });
      return;
    }
  });

});



module.exports = router;