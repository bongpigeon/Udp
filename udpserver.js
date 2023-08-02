const dgram = require('dgram');
const axios = require('axios');

let conf = require('./conf');

let server = dgram.createSocket('udp4');

// create ae
create_ae();

function create_ae() {
let ae_data = {
   "m2m:ae": {
"rn": conf.ae.name,
"api": "0.2.481.2.001.001.000111",
"lbl": ["key1", "key2"],
"rr": true
   }
};

let ae_config = {
   validateStatus: function (status) {
// 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
return status < 500;
   },
   method: 'post',
   maxBodyLength: Infinity,
   url: 'http://' + conf.cse.host + ':' + conf.cse.port + '/' + conf.cse.name,
   headers: {
"Accept": 'application/json',
"X-M2M-RI": '12345',
"X-M2M-Origin": 'S' + conf.ae.name,
"Content-Type": 'application/json;ty=2'
   },
   data: ae_data
};

axios.request(ae_config)
   .then((res) => {
//console.log(res.headers['x-m2m-rsc']);
let rsc = res.headers['x-m2m-rsc'];
if (rsc === '2001' || rsc === '4105') {
   // console.log('create ae success ->', 'create cnt')
   setTimeout(create_cnt, 1000);
}
   })
   .catch((error) => {
console.log(error);
setTimeout(create_ae, 500);
   });
}

function create_cnt() {
let cnt_data = {
       "m2m:cnt": {
           "rn": conf.cnt[0].name,
           "lbl": [conf.cnt[0].name],
           "mbs": 16384
       }
   };
let cnt_config = {
validateStatus: function (status) {
   // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
   return status < 500;
},
method: 'post',
maxBodyLength: Infinity,
url: 'http://' + conf.cse.host + ':' + conf.cse.port + '/' + conf.cse.name + '/' + conf.ae.name,
headers: {
   'Accept': 'application/json',
   'X-M2M-RI': '12345',
   "X-M2M-Origin": 'S' + conf.ae.name,
   'Content-Type': 'application/json;ty=3'
},
data: cnt_data
};

axios.request(cnt_config)
.then((res) => {
   //console.log(res.headers['x-m2m-rsc']);
   let rsc = res.headers['x-m2m-rsc'];
   if (rsc == '5106' || rsc == '2001' || rsc == '4105') {
// create sub
// server bind
server.bind(7001);
   }
})
.catch((error) => {
console.log(error);
setTimeout(create_cnt, 500);
});
}

server.on('error', (err) => {
    console.log('server error:\n${err.stack}');
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log('server got:', msg.toString(), 'from', rinfo.address, rinfo.port);
    let con = JSON.parse(msg.toString());
    // cin upload..
    let cin_data = {
        "m2m:cin": {
            "con": con
        }
    };

    let cin_config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://' + conf.cse.host + ':' + conf.cse.port + '/' + conf.cse.name + '/' + conf.ae.name + '/' + conf.cnt[0].name,
        headers: {
            'Accept': 'application/json',
            'X-M2M-RI': '12345',
            'X-M2M-Origin': 'S' + conf.ae.name,
            'Content-Type': 'application/json;ty=4'
        },
        data: cin_data
    };

    axios.request(cin_config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
});

server.on('listening', () => {
    let address = server.address();
    console.log('server listening', address.address, ':', address.port);
});