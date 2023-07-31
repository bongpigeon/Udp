/**
 * Created by Il Yeup, Ahn in KETI on 2017-02-23.
 */

/**
 * Copyright (c) 2018, OCEAN
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. The name of the author may not be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var ip = require("ip");
let { nanoid } = require("nanoid");

var conf = {};
var cse = {};
var ae = {};
var cnt_arr = [];
var sub_arr = [];
var acp = {};

conf.useprotocol = 'http'; // select one for 'http' or 'mqtt' or 'coap' or 'ws'

conf.sim = 'disable'; // enable or disable

// build cse
cse = {
    host    : '203.253.128.177',
    port    : '7579',
    name    : 'Mobius',
    id      : '/Mobius',
    mqttport: '1883',
    wsport  : '7577',
};

// build ae
let ae_name = 'UVINet_Modem';

ae = {
    name    : ae_name,
    id      : 'S8Sgr4E5Xqxx',
    parent  : '/' + cse.name,
    appid   : 'SSon',
    port    : '9727',
    bodytype: 'json',
    tasport : '3105',
};

// build cnt
cnt_arr = [
    {
        parent: '/' + cse.name + '/' + ae.name,
        name: 'A111',
    },
];

// build sub


conf.cse = cse;
conf.ae = ae;
conf.cnt = cnt_arr;

module.exports = conf;
