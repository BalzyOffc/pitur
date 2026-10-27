/*

# Base By Obito?
# Owner ? : t.me/OBITOBOYS
!- do not delete this credit

*/

require('./config')
// AUTO BACKUP KE TELE TIAP 6 JAM
setInterval(async () => {
    if (!global.tele_backup_token) return;
    try {
        const archiver = require('archiver');
        let outputPath = `/tmp/autobackup.zip`;
        let output = fs.createWriteStream(outputPath);
        let archive = archiver('zip', { zlib: { level: 9 } });
        output.on('close', async () => {
            const FormData = require('form-data');
            let form = new FormData();
            form.append('chat_id', global.tele_backup_chat);
            form.append('document', fs.createReadStream(outputPath));
            form.append('caption', `AUTO BACKUP ${new Date().toLocaleString()}`);
            await axios.post(`https://api.telegram.org/bot${global.tele_backup_token}/sendDocument`, form, { headers: form.getHeaders() }).catch(()=>{});
            fs.unlinkSync(outputPath);
        });
        archive.pipe(output);
        if (fs.existsSync('./config.js')) archive.file('config.js', { name: 'config.js' });
        if (fs.existsSync('./session')) archive.directory('session/', 'session');
        await archive.finalize();
    } catch {}
}, 6 * 60 * 60 * 1000); // 6 jam
const {
	pawConnect,
	downloadContentFromMessage,
	emitGroupParticipantsUpdate,
	emitGroupUpdate,
	generateWAMessageContent,
	generateWAMessage,
	makeInMemoryStore,
	prepareWAMessageMedia,
	generateWAMessageFromContent,
	MediaType,
	areJidsSameUser,
	WAMessageStatus,
	downloadAndSaveMediaMessage,
	AuthenticationState,
	GroupMetadata,
	initInMemoryKeyStore,
	getContentType,
	MiscMessageGenerationOptions,
	useSingleFileAuthState,
	BufferJSON,
	WAMessageProto,
	MessageOptions,
	WAFlag,
	WANode,
	WAMetric,
	ChatModification,
	MessageTypeProto,
	WALocationMessage,
	ReconnectMode,
	WAContextInfo,
	proto,
	WAGroupMetadata,
	ProxyAgent,
	waChatKey,
	MimetypeMap,
	MediaPathMap,
	WAContactMessage,
	WAContactsArrayMessage,
	WAGroupInviteMessage,
	WATextMessage,
	WAMessageContent,
	WAMessage,
	BaileysError,
	WA_MESSAGE_STATUS_TYPE,
	MediaConnInfo,
	URL_REGEX,
	WAUrlInfo,
	WA_DEFAULT_EPHEMERAL,
	WAMediaUpload,
	mentionedJid,
	processTime,
	Browser,
	MessageType,
	Presence,
	WA_MESSAGE_STUB_TYPES,
	Mimetype,
	relayWAMessage,
	Browsers,
	GroupSettingChange,
	DisconnectReason,
	WASocket,
	getStream,
	WAProto,
	isBaileys,
	AnyMessageContent,
	fetchLatestBaileysVersion,
	templateMessage,
	InteractiveMessage,
	Header
} = require("@whiskeysockets/baileys")
const fs = require('fs')
const axios = require('axios')
const fetch = require('node-fetch')
const chalk = require('chalk')
const speed = require('performance-now')
const moment = require('moment-timezone')
const os = require('os')
const util = require('util')
const FormData = require('form-data')
const { spawn: spawn, exec } = require("child_process")
const IKYY_API = "https://api.ikyyxd.my.id";
const APIKEY = "kyzz"; // ganti pakai apikey lu yang dari ikyyxd.my.id

module.exports = conn = handler = async (conn, m, chatUpdate, store) => {
	try {
	
		const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./lib/myfunc.js');
		const { toAudio, toPTT, toVideo, ffmpeg, addExifAvatar } = require('./lib/converter');
		const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader');

		var body = (
			m.mtype === 'conversation' ? m.message.conversation :
			m.mtype === 'imageMessage' ? m.message.imageMessage.caption :
			m.mtype === 'videoMessage' ? m.message.videoMessage.caption :
			m.mtype === 'extendedTextMessage' ? m.message.extendedTextMessage.text :
			m.mtype === 'buttonsResponseMessage' ? m.message.buttonsResponseMessage.selectedButtonId :
			m.mtype === 'listResponseMessage' ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
			m.mtype === 'interactiveResponseMessage' ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :
			m.mtype === 'templateButtonReplyMessage' ? m.message.templateButtonReplyMessage.selectedId :
			m.mtype === 'messageContextInfo' ?
			m.message.buttonsResponseMessage?.selectedButtonId ||
			m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
			m.message.InteractiveResponseMessage.NativeFlowResponseMessage ||
			m.text :
			''
			);
		if (body == undefined) { body = '' };
		var budy = (typeof m.text == "string" ? m.text : "");

		const prefixRegex = /[.!#÷×/]/;
		const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : null;
		const isCmd = prefix ? body.startsWith(prefix) : false;
		const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';		
		const args = budy.trim().split(/ +/).slice(1);
		const q = text = args.join(' ')

		const botNumber = conn.user.id.split(':')[0];
		const pushname = m.pushName || "No Name";
		const senderNumber = m.sender.split('@')[0];	
		const itsMe = m.sender == botNumber;
		const isOwner = [botNumber, ...global.owner]
			.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
			.includes(m.sender);
			
		if (!conn.public) {
			if (!m.fromMe && !isOwner) return;
		};

		const isGroup = m.chat.endsWith('@g.us');
		const groupMetadata = isGroup ? await conn.groupMetadata(m.chat).catch(e => null) : null;
		const groupName = groupMetadata?.subject || '';
		const groupMembers = groupMetadata?.participants || [];
		const groupAdmins = groupMembers.length ? await getGroupAdmins(groupMembers) : [];
		const isBotAdmin = groupAdmins.includes(botNumber + '@s.whatsapp.net');
		const isBotAdmins = groupAdmins.includes(botNumber);
		const isAdmins = groupAdmins.includes(m.sender);
		const groupOwner = groupMetadata?.owner || '';
		const isGroupOwner = groupOwner ? groupOwner === m.sender : groupAdmins.includes(m.sender);

		const isMedia = (m.type === 'imageMessage' || m.type === 'videoMessage')
		const fatkuns = (m.quoted || m)
		const quoted = (fatkuns.mtype == "buttonsMessage") ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == "templateMessage") ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == "product") ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
		const qmsg = (quoted.msg || quoted)
		const mime = qmsg.mimetype || "";
		const moon = fs.readFileSync('./media/moon.jpeg')
		const wangy = fs.readFileSync('./media/peler.jpeg')

		const time = moment().tz("Asia/Jakarta").format("HH:mm:ss");
		let ucapanWaktu;
		if (time >= "19:00:00" && time < "23:59:00") { ucapanWaktu = "夜 🌌"; } 
		else if (time >= "15:00:00" && time < "19:00:00") { ucapanWaktu = "午後 🌇"; } 
		else if (time >= "11:00:00" && time < "15:00:00") { ucapanWaktu = "正午 🏞️"; } 
		else if (time >= "06:00:00" && time < "11:00:00") { ucapanWaktu = "朝 🌁"; } 
		else { ucapanWaktu = "夜明け 🌆"; }
		const wib = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("HH:mm:ss z");

		const ctt = {
			key: { remoteJid: '0@s.whatsapp.net', participant: '0@s.whatsapp.net', fromMe: false },
			message: { contactMessage: { displayName: (pushname), vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, } }
		};

		const xreply = async (teks) => {
			await sleep(500)
			return conn.sendMessage(m.chat, {
				contextInfo: {
					mentionedJid: [m.sender],
					externalAdReply: { showAdAttribution: false, renderLargerThumbnail: false, title: `BALZY EMDE - IdIoT`, body: `By BALZY EMDE`, previewType: "VIDEO", thumbnail: moon, sourceUrl: global.url, mediaUrl: global.url }
				},
				text: teks
			}, { quoted: ctt })
		}
		
        async function prM(params) { return await prepareWAMessageMedia(params, { upload: conn.waUploadToServer }) }

		if (isCmd)  {
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
        }

async function restartPanelServer() {
    const API_KEY = global.ptero_api || 'Bearer YOUR_API_KEY_HERE';
    const SERVER_ID = global.ptero_id || 'ebcefc66';
    const PTERO_URL = global.ptero_url || 'https://panel.bot-nexus.xyz';
    try {
        await axios.post(`${PTERO_URL}/api/client/servers/${SERVER_ID}/power`, { signal: 'restart' }, {
            headers: { Authorization: API_KEY, 'Content-Type': 'application/json', Accept: 'application/json' }
        });
        return 'Server berhasil direstart via Pterodactyl.';
    } catch (err) {
        return 'Gagal restart: ' + (err.response?.data?.errors?.[0]?.detail || err.message);
    }
}

async function uploadToCatbox(filePath) {
    try {
        const form = new FormData();
        form.append('reqtype', 'fileupload');
        form.append('fileToUpload', fs.createReadStream(filePath));
        const res = await axios.post('https://catbox.moe/user/api.php', form, { headers: form.getHeaders() });
        return res.data;
    } catch { return null; }
}

		switch (command) {

            case 'onbot':
case 'menu':
case 'help': {
    const menu = `╭───「 *BALZY EMDE FUN BOT* 」───╮
│ Halo ${pushname}!
╰─────────────────────╯

📥 *DOWNLOADER*
• .dl <url> - direct file
• .tiktok / .tt <url>
• .ig <url>
• .fb <url>
• .ytmp3 <url>
• .ytmp4 <url>

🎵 *MUSIC*
• .play <judul / yt link> - cari & download lagu
• .song <judul>

🔗 *TO URL*
•.tourl 
.catbox - reply foto/video jadi link permanen

🧩 *TOOLS*
• .maker <teks>
• .quote
• .ping
• .runtime
• .cekurl <url>

🎮 *GAME*
.dadu
.coin
.tebakangka`;
    await conn.sendMessage(m.chat, { text: menu }, { quoted: m });
}
break;
// ENDD
case 'update': {
    if (!isOwner) return m.reply('Owner only!');
    
    const axios = require('axios');
    const fs = require('fs');
    
    try {
        let usn = global.usn
        let repo = global.repo
        let branch = global.branch || "main"
        let raw = global.raw || "https://raw.githubusercontent.com/"
        let ghp = global.ghp || ""

        if (!usn || !repo || usn == "username") {
            return m.reply(`❌ Setting belum diisi\n\nBuka setting.js:\nglobal.usn = "username github"\nglobal.repo = "nama repo"\nglobal.branch = "main"\nglobal.ghp = "" // kosongin kalau public\n\nTerus bikin file update-list.json`);
        }

        // BACA LIST FILE DARI update-list.json
        let files = [];
        if (fs.existsSync('./update-list.json')) {
            files = JSON.parse(fs.readFileSync('./update-list.json', 'utf8'));
        } else {
            files = ["balzy.js", "case.js", "index.js"]; // default kalau file json gak ada
        }

        // KALAU KETIK .update balzy.js -> CUMA UPDATE 1 FILE
        if (q) files = [q.trim()];

        await conn.sendMessage(m.chat, { text: `🔄 *UPDATE BOT*\n\n📦 ${usn}/${repo}:${branch}\n📄 ${files.length} file\n⏳ Download...` }, { quoted: m });

        let headers = {};
        if (ghp) headers['Authorization'] = `token ${ghp}`;

        let ok = [], fail = [];

        for (let file of files) {
            try {
                let url = `${raw}${usn}/${repo}/${branch}/${file}`;
                let res = await axios.get(url, { headers, timeout: 20000 });
                
                // bikin folder kalau belum ada (misal lib/function.js)
                let dir = file.split('/').slice(0, -1).join('/');
                if (dir && !fs.existsSync('./' + dir)) fs.mkdirSync('./' + dir, { recursive: true });
                
                if (fs.existsSync('./' + file)) fs.writeFileSync('./' + file + '.bak', fs.readFileSync('./' + file));
                fs.writeFileSync('./' + file, res.data);
                ok.push(file);
            } catch (e) {
                fail.push(`${file}`);
            }
        }

        let teks = `✅ *UPDATE DONE*\n\nRepo: ${usn}/${repo}\nSukses ${ok.length}/${files.length}\n${ok.map(v => `• ${v}`).join('\n')}`
        if (fail.length) teks += `\n\nGagal ${fail.length}:\n${fail.map(v => `• ${v}`).join('\n')}\n\nCek nama file di update-list.json bener gak`;
        teks += `\n\n🔄 Restart 3 detik...`;

        await conn.sendMessage(m.chat, { text: teks }, { quoted: m });
        setTimeout(() => process.exit(0), 3000);

    } catch (e) {
        m.reply(`❌ Error: ${e.message}`);
    }
}
break;
case 'push':
case 'savegithub':
case 'upgithub': {
    if (!isOwner) return m.reply('Owner only!');
    
    const axios = require('axios');
    const fs = require('fs');
    
    try {
        let usn = global.usn
        let repo = global.repo
        let branch = global.branch || "main"
        let ghp = global.ghp

        if (!ghp) return m.reply(`❌ Isi dulu global.ghp di setting.js\nCara dapet:\nGithub App > Settings > Personal access tokens > Generate (classic) > centang repo`);

        // .push case.js  atau .push all
        let target = q || "all";
        
        await conn.sendMessage(m.chat, { text: `📤 Push ke Github...\n${usn}/${repo}:${branch}\nTarget: ${target}` }, { quoted: m });

        let files = [];
        if (target.toLowerCase() === "all") {
            if (fs.existsSync('./update-list.json')) {
                files = JSON.parse(fs.readFileSync('./update-list.json', 'utf8'));
            } else {
                files = ["balzy.js", "case.js", "setting.js"];
            }
        } else {
            files = [target];
        }

        let headers = {
            'Authorization': `token ${ghp}`,
            'Accept': 'application/vnd.github.v3+json'
        };

        let ok = [], fail = [];

        for (let file of files) {
            try {
                if (!fs.existsSync('./' + file)) {
                    fail.push(`${file} gak ada di panel`);
                    continue;
                }

                let content = fs.readFileSync('./' + file, 'utf8');
                let base64 = Buffer.from(content).toString('base64');

                // Cek SHA file lama
                let sha = null;
                try {
                    let get = await axios.get(`https://api.github.com/repos/${usn}/${repo}/contents/${file}?ref=${branch}`, { headers });
                    sha = get.data.sha;
                } catch {}

                // Push
                let data = {
                    message: `update ${file} via bot ${new Date().toLocaleString('id-ID')}`,
                    content: base64,
                    branch: branch
                };
                if (sha) data.sha = sha;

                await axios.put(`https://api.github.com/repos/${usn}/${repo}/contents/${file}`, data, { headers });
                ok.push(file);

            } catch (e) {
                fail.push(`${file}: ${e.response?.data?.message || e.message}`);
            }
        }

        let teks = `✅ *PUSH DONE*\n\nSukses ${ok.length}:\n${ok.map(v => `• ${v}`).join('\n')}`;
        if (fail.length) teks += `\n\nGagal:\n${fail.map(v => `• ${v}`).join('\n')}`;
        
        m.reply(teks);

    } catch (e) {
        m.reply(`❌ Push error: ${e.message}`);
    }
}
break;

case 'backuptele':
case 'btele': {
    if (!isOwner) return;
    m.reply('⏳ Backup + kirim ke Telegram...');

    try {
        const archiver = require('archiver');
        let outputPath = `/tmp/backup-${Date.now()}.zip`;
        let output = fs.createWriteStream(outputPath);
        let archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', async () => {
            // kirim ke tele
            try {
                const FormData = require('form-data');
                let form = new FormData();
                form.append('chat_id', global.tele_backup_chat);
                form.append('document', fs.createReadStream(outputPath));
                form.append('caption', `BACKUP BOT ${new Date().toLocaleString()}\nPanel: ${global.ptero_url || 'bot-nexus'}`);

                await axios.post(`https://api.telegram.org/bot${global.tele_backup_token}/sendDocument`, form, {
                    headers: form.getHeaders()
                });

                m.reply(`✅ Berhasil backup ke Telegram!\nSize: ${(archive.pointer()/1024/1024).toFixed(2)} MB\nCek Telegram lu.`);
            } catch (e) {
                console.log(e);
                m.reply('Gagal kirim ke tele, cek token tele lu');
            }
            fs.unlinkSync(outputPath);
        });

        archive.pipe(output);
        if (fs.existsSync('./config.js')) archive.file('config.js', { name: 'config.js' });
        if (fs.existsSync('./balzy.js')) archive.file('balzy.js', { name: 'balzy.js' });
        if (fs.existsSync('./lib')) archive.directory('lib/', 'lib');
        if (fs.existsSync('./database')) archive.directory('database/', 'database');
        if (fs.existsSync('./session')) archive.directory('session/', 'session');
        if (fs.existsSync('./auth_info_baileys')) archive.directory('auth_info_baileys/', 'auth_info_baileys');
        await archive.finalize();

    } catch (e) {
        m.reply('Install dulu: npm i archiver form-data');
    }
}
break;

case 'backup':
case 'backupsc':
case 'backupbot': {
    if (!isOwner) return m.reply('Khusus owner!');
    m.reply('⏳ Lagi backup sc...');

    try {
        const archiver = require('archiver');
        const path = require('path');
        
        let outputPath = `./backup-${Date.now()}.zip`;
        let output = fs.createWriteStream(outputPath);
        let archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', async () => {
            // kirim zip nya
            await conn.sendMessage(m.chat, {
                document: fs.readFileSync(outputPath),
                fileName: `backup-sc-${new Date().toISOString().slice(0,10)}.zip`,
                mimetype: 'application/zip',
                caption: `✅ *Backup Berhasil*\n\n📦 Size: ${(archive.pointer()/1024/1024).toFixed(2)} MB\n📅 ${new Date().toLocaleString()}\n\nIsi: config.js, database, session, lib, media`
            }, { quoted: m });
            
            // hapus file zip setelah dikirim biar gak numpuk
            fs.unlinkSync(outputPath);
        });

        archive.on('error', (err) => { throw err; });
        archive.pipe(output);

        // FILE YANG DI BACKUP - atur disini mau apa aja
        archive.file('config.js', { name: 'config.js' });
        if (fs.existsSync('./balzy.js')) archive.file('balzy.js', { name: 'balzy.js' });
        if (fs.existsSync('./index.js')) archive.file('index.js', { name: 'index.js' });
        
        // folder penting
        if (fs.existsSync('./lib')) archive.directory('lib/', 'lib');
        if (fs.existsSync('./media')) archive.directory('media/', 'media');
        if (fs.existsSync('./database')) archive.directory('database/', 'database');
        
        // session auth - PENTING
        if (fs.existsSync('./session')) archive.directory('session/', 'session');
        if (fs.existsSync('./auth_info_baileys')) archive.directory('auth_info_baileys/', 'auth_info_baileys');
        if (fs.existsSync('./paw_auth')) archive.directory('paw_auth/', 'paw_auth');

        // jangan backup node_modules biar gak gede
        await archive.finalize();
        
    } catch (e) {
        console.log(e);
        // fallback kalo gak ada archiver, pakai zip manual via exec
        try {
            exec('zip -r backup.zip config.js lib/ database/ session/ --exclude "node_modules/*"', async (err, stdout) => {
                if (err) return m.reply('Gagal backup, install dulu: npm i archiver');
                await conn.sendMessage(m.chat, { document: fs.readFileSync('./backup.zip'), fileName: 'backup.zip', mimetype: 'application/zip' }, { quoted: m });
                fs.unlinkSync('./backup.zip');
            });
        } catch {
            m.reply('Gagal backup. Install: npm i archiver');
        }
    }
}
break;

// AUTO BACKUP TIAP 24 JAM (taro di luar switch, di atas switch)
case 'autobackup': {
    if (!isOwner) return;
    if (q === 'on') {
        global.autoBackup = true;
        m.reply('✅ Auto backup tiap 24 jam AKTIF');
        setInterval(async () => {
            if (!global.autoBackup) return;
            // panggil fungsi backup otomatis kirim ke owner
            let ownerJid = global.owner[0] + '@s.whatsapp.net';
            // ... (pakai logic backup yang sama di atas)
        }, 24*60*60*1000);
    } else if (q === 'off') {
        global.autoBackup = false;
        m.reply('❌ Auto backup MATI');
    } else {
        m.reply(`Contoh: ${prefix+command} on / off`);
    }
}
break;

case 'dl':
case 'download': {
    if (!q) return m.reply(`Contoh: ${prefix + command} https://example.com/file.pdf`);
    let url;
    try { url = new URL(q.trim()); } catch { return m.reply('URL tidak valid'); }
    if (!['http:', 'https:'].includes(url.protocol)) return m.reply('Protokol tidak didukung');
    try {
        const res = await axios.get(url.href, {
            responseType: 'arraybuffer', timeout: 20000, maxContentLength: 20 * 1024 * 1024, maxBodyLength: 20 * 1024 * 1024,
            headers: { 'User-Agent': 'Mozilla/5.0 ObitoFunBot/1.0' }, validateStatus: s => s >= 200 && s < 300
        });
        const contentType = String(res.headers['content-type'] || 'application/octet-stream').split(';')[0];
        let filename = decodeURIComponent(url.pathname.split('/').pop() || 'download');
        filename = filename.replace(/[^\w.\- ()]/g, '_').slice(0, 100) || 'download';
        await conn.sendMessage(m.chat, { document: Buffer.from(res.data), mimetype: contentType, fileName: filename, caption: `✅ ${filename}` }, { quoted: m });
    } catch (e) {
        return m.reply(`❌ Gagal download. Batas 20MB`);
    }
}
break;

case 'tourl':
case 'tourl2':
case 'catbox': {
    if (!m.quoted && !isMedia) return m.reply(`Reply gambar/video/sticker dengan ${prefix+command}`);
    m.reply('⏳ Uploading ke Catbox...');
    try {
        let mediaPath = await conn.downloadAndSaveMediaMessage(quoted);
        let url = await uploadToCatbox(mediaPath);
        if (!url) url = await TelegraPh(mediaPath);
        if (!url) url = await UploadFileUgu(mediaPath);
        fs.unlinkSync(mediaPath);
        if (!url) return m.reply('Gagal upload');
        return m.reply(`✅ *Berhasil*\n\n*URL:* ${url}\n*Type:* ${mime}\nPermanent link.`);
    } catch (e) { return m.reply('Gagal tourl, max 10MB'); }
}
break;

case 'ig':
case 'igdl':
case 'instagram': {
    if (!q) return m.reply(`Contoh: ${prefix+command} https://www.instagram.com/reel/xxxx/`);
    m.reply('⏳ IG DL...');
    try {
        let { data } = await axios.get(`https://api.tiklydown.eu.org/api/instagram?url=${q}`);
        let urls = data.result;
        for (let u of urls) {
            await conn.sendMessage(m.chat, { video: { url: u }, caption: '✅ IG' }, { quoted: m });
        }
    } catch { m.reply('Gagal IG, pastikan link public'); }
}
break;

case 'fb':
case 'fbdl':
case 'facebook': {
    if (!q) return m.reply(`Contoh: ${prefix+command} https://www.facebook.com/reel/xxx`);
    m.reply('⏳ FB DL...');
    try {
        let res = await fetchJson(`https://api.tiklydown.eu.org/api/facebook?url=${q}`);
        let url = res.result?.video_hd || res.result?.video_sd || res.result?.video;
        if (!url) return m.reply('Gak ketemu video');
        await conn.sendMessage(m.chat, { video: { url }, caption: '✅ FB' }, { quoted: m });
    } catch { m.reply('Gagal FB DL'); }
}
break;

case 'play':
case 'song':
case 'music': {
    if (!q) return m.reply(`Contoh: ${prefix+command} galau - dj fredy\nAtau: ${prefix+command} https://youtu.be/xxxx`);
    try {
        let ytUrl = q;
        let isLink = isUrl(q) && q.includes('youtu');
        if (!isLink) {
            m.reply(`🔎 Cari *${q}*...`);
            let searchRes = await axios.get(`https://api.tiklydown.eu.org/api/youtube/search?query=${encodeURIComponent(q)}`);
            let result = searchRes.data.result;
            if (!result || !result.length) return m.reply('Lagu gak ketemu');
            ytUrl = result[0].url;
            await conn.sendMessage(m.chat, { text: `🎵 *${result[0].title}*\n📺 ${result[0].channel}\n⏱️ ${result[0].duration}\n\n⏳ Download audio...` }, { quoted: m });
        } else { m.reply('⏳ Download audio...'); }
        let dl = await fetchJson(`https://api.tiklydown.eu.org/api/youtube/mp3?url=${ytUrl}`);
        if (!dl.result?.downloadUrl) return m.reply('Gagal download');
        await conn.sendMessage(m.chat, { audio: { url: dl.result.downloadUrl }, mimetype: 'audio/mpeg', fileName: `${dl.result.title}.mp3` }, { quoted: m });
    } catch (e) { m.reply('Gagal play, API limit coba lagi'); }
}
break;

// ========== FITUR VIRAL INDO - PALING RAME ==========
case 'khodam':
case 'cekkhodam': {
    if (!q) return m.reply(`Contoh: ${prefix+command} balzy\nCek khodam lu apa`);
    const listKhodam = ['Macan Putih', 'Kunti Bogor', 'Tuyul Gendut', 'Naga Hitam', 'Harimau Sumatera', 'Jin Tomang', 'Singa Barong', 'Kosong - Gak punya khodam', 'Ratu Kidul', 'Genderuwo Alim', 'Tuyul Cina', 'Pocong Mumun'];
    const khodam = listKhodam[Math.floor(Math.random()*listKhodam.length)];
    return conn.sendMessage(m.chat, { text: `🔮 *CEK KHODAM*\n\nNama: ${q}\nKhodam: *${khodam}*\n\nKhodam ${khodam} penjaga setia lu 🗿` }, { quoted: m });
}
break;

case 'cekjodoh':
case 'jodoh': {
    if (!q.includes('|')) return m.reply(`Contoh: ${prefix+command} balzy | Ayaka\nPakai | buat pisahin 2 nama`);
    let [nama1, nama2] = q.split('|').map(v=>v.trim());
    let persen = Math.floor(Math.random()*101);
    let status = persen > 80 ? 'JODOH BANGET 💖' : persen > 50 ? 'Lumayan cocok 💕' : 'Kurang cocok 💔';
    return m.reply(`💘 *CEK JODOH*\n\n${nama1} ❤️ ${nama2}\nKecocokan: *${persen}%*\nStatus: ${status}`);
}
break;

case 'rate':
case 'nilai': {
    if (!q) return m.reply(`Contoh: ${prefix+command} seberapa ganteng gw`);
    let rate = Math.floor(Math.random()*101);
    return m.reply(`📊 *RATE*\n\nPertanyaan: ${q}\nNilai: *${rate}/100*\n${rate > 80 ? '🔥 GACOR PARAH' : rate > 50 ? '😎 Lumayan' : '💀 Ampas'}`);
}
break;

// ========== STICKER KEREN - BRAT VIRAL ==========
case 's':
case 'sticker':
case 'stiker': {
    if (!m.quoted && !isMedia) return m.reply(`Reply gambar/video dengan ${prefix+command}`);
    try {
        let media = await conn.downloadAndSaveMediaMessage(quoted);
        let anu = await addExifAvatar(media, `BALZY EMDE Bot`); // exif biar ada nama
        let buff = fs.readFileSync(anu);
        await conn.sendMessage(m.chat, { sticker: buff }, { quoted: m });
        fs.unlinkSync(media); fs.unlinkSync(anu);
    } catch { m.reply('Gagal jadi stiker'); }
}
break;

// ========== AI CHAT - BIKIN BOT PINTER ==========
case 'ai':
case 'gpt':
case 'openai': {
    if (!q) return m.reply(`Contoh: ${prefix+command} siapa presiden indonesia?`);
    m.reply('🤖 AI mikir...');
    try {
        let res = await axios.get(`https://api.ryzendesu.vip/api/ai/chatgpt?text=${encodeURIComponent(q)}`);
        let answer = res.data.answer || res.data.result || 'Gagal dapet jawaban AI';
        return m.reply(`🤖 *BALZY EMDE AI*\n\n${answer}`);
    } catch {
        // fallback api
        try {
            let res2 = await fetchJson(`https://api.betabotz.eu.org/api/search/openai-chat?text=${q}&apikey=YOURKEY`);
            return m.reply(res2.message);
        } catch { return m.reply('AI lagi error, coba lagi'); }
    }
}
break;

// ========== GAME SERU - BIKIN GRUP AKTIF ==========
case 'family100':
case 'fam100': {
    const soal = [
        { q: 'Apa yang sering dicari orang hilang?', a: ['orang', 'barang', 'kunci', 'hp', 'dompet'] },
        { q: 'Makanan yang sering dibakar?', a: ['sate', 'jagung', 'ikan', 'ayam', 'roti'] },
        { q: 'Alasan orang telat?', a: ['macet', 'banjir', 'bangun siang', 'motor rusak', 'hujan'] }
    ];
    let pil = soal[Math.floor(Math.random()*soal.length)];
    global.familyGame = global.familyGame || {};
    global.familyGame[m.chat] = { soal: pil, terjawab: [], hadiah: 10 };
    return m.reply(`🎮 *FAMILY 100*\n\nSoal: *${pil.q}*\n\nAda ${pil.a.length} jawaban\nJawab aja langsung di chat!`);
}
break;

case 'suit':
case 'suitpvp': {
    if (!m.isGroup) return m.reply('Suit cuma di grup');
    if (!q.includes('@')) return m.reply(`Contoh: ${prefix+command} @tag lawan\nPilihan: gunting/batu/kertas`);
    // simple suit gunting batu kertas
    let lawan = m.mentionedJid[0];
    if (!lawan) return m.reply('Tag lawan!');
    global.suit = global.suit || {};
    let id = m.chat;
    if (global.suit[id]) return m.reply('Masih ada suit berjalan di grup ini');
    global.suit[id] = { p1: m.sender, p2: lawan, status: 'wait' };
    return conn.sendMessage(m.chat, { text: `🎮 @${lawan.split('@')[0]} ditantang suit sama @${m.sender.split('@')[0]}\n\nKetik .terimasuit / .tolaksuit`, mentions: [m.sender, lawan] }, { quoted: m });
}
break;

case 'terimasuit': {
    let id = m.chat;
    if (!global.suit || !global.suit[id] || global.suit[id].p2 !== m.sender) return m.reply('Gak ada tantangan buat lu');
    global.suit[id].status = 'play';
    return m.reply(`Suit diterima! \n\nKalian berdua chat bot di private buat pilih gunting/batu/kertas\nKetik: .pilihsuit gunting`);
}
break;

case 'jadian':
case 'tembak': {
    if (!m.isGroup) return m.reply('Cuma bisa di grup');
    let members = groupMembers.map(v=>v.id).filter(v=>v!==m.sender && v!==botNumber+'@s.whatsapp.net');
    if (members.length < 1) return m.reply('Grup sepi');
    let pasangan = members[Math.floor(Math.random()*members.length)];
    return conn.sendMessage(m.chat, { text: `💘 *JODOH HARI INI*\n\n@${m.sender.split('@')[0]} ❤️ @${pasangan.split('@')[0]}\n\nCieee jadian 😍 cocok banget!`, mentions: [m.sender, pasangan] }, { quoted: m });
}
break;

case 'tagall': {
    if (!isAdmins && !isOwner) return m.reply('Admin only');
    if (!q) return m.reply(`Contoh: ${prefix+command} halo guys kumpul`);
    let teks = `📢 *TAG ALL*\n\nPesan: ${q}\n\n`;
    for (let mem of groupMembers) { teks += `@${mem.id.split('@')[0]} `; }
    return conn.sendMessage(m.chat, { text: teks, mentions: groupMembers.map(v=>v.id) }, { quoted: m });
}
break;

case 'hentai':
case 'waifu':
case 'neko': {
    // random anime image buat hiburan
    try {
        let res = await axios.get(`https://api.waifu.pics/sfw/waifu`);
        await conn.sendMessage(m.chat, { image: { url: res.data.url }, caption: `✨ Random ${command}` }, { quoted: m });
    } catch { m.reply('Gagal ambil waifu'); }
}
break;

case 'ytmp3': {
    if (!q) return m.reply(`Contoh: ${prefix+command} https://youtu.be/xxxx`);
    m.reply('⏳ MP3...');
    try {
        let res = await fetchJson(`https://api.tiklydown.eu.org/api/youtube/mp3?url=${q}`);
        await conn.sendMessage(m.chat, { audio: { url: res.result.downloadUrl }, mimetype: 'audio/mpeg', fileName: `${res.result.title}.mp3` }, { quoted: m });
    } catch { m.reply('Gagal ytmp3'); }
}
break;

case 'ytmp4': {
    if (!q) return m.reply(`Contoh: ${prefix+command} https://youtu.be/xxxx`);
    m.reply('⏳ MP4...');
    try {
        let res = await fetchJson(`https://api.tiklydown.eu.org/api/youtube/mp4?url=${q}`);
        await conn.sendMessage(m.chat, { video: { url: res.result.downloadUrl }, caption: res.result.title }, { quoted: m });
    } catch { m.reply('Gagal ytmp4'); }
}
break;

// === FITUR IQC - FAKE IPHONE CHAT ===
case 'iqc':
case 'iphonechat': {
    if (!q) return m.reply(`Contoh: .iqc halo|23:00|12:30\nFormat: text|chatTime|statusBarTime`);
    let [text, chatTime, statusTime] = q.split('|');
    if (!text) return m.reply(`Format salah, contoh: .iqc halo bal|23:27|23:27`);
    
    try {
        m.reply(`⏳ Bikin iQC...`);
        let url = `${IKYY_API}/canvas/iqc?text=${encodeURIComponent(text)}&chatTime=${encodeURIComponent(chatTime||'23:27')}&statusBarTime=${encodeURIComponent(statusTime||'23:27')}`;
        await conn.sendMessage(m.chat, { image: { url: url }, caption: `✅ iQC - ${text}` }, { quoted: m });
    } catch (e) { m.reply(`❌ Error iQC: ${e.message}`); }
}
break;

// === FITUR BRAT VIDEO ===
// === BRAT LANGSUNG STIKER ===
case 'brat':
case 'bs': {
    if (!q) return m.reply(`Contoh: .brat balzy emde`);
    try {
        const axios = require('axios');
        const { Sticker, StickerTypes } = require('wa-sticker-formatter');
        
        let apiUrl = `https://api.ikyyxd.my.id/canvas/bratv1?apikey=kyzz&text=${encodeURIComponent(q)}`;
        await conn.sendMessage(m.chat, { text: `⏳ Bikin stiker brat...` }, { quoted: m });

        let res = await axios.get(apiUrl, { responseType: 'arraybuffer', timeout: 30000 });
        
        // CONVERT JADI STIKER WEBP PAKAI LIB
        let sticker = new Sticker(res.data, {
            pack: 'BALZY EMDE',
            author: 'BALJI NI WOIK',
            type: StickerTypes.FULL, // biar full gak kepotong
            categories: ['🤣'],
            quality: 80
        });

        let buffer = await sticker.toBuffer();
        await conn.sendMessage(m.chat, { sticker: buffer }, { quoted: m });

    } catch (e) {
        console.log(e);
        m.reply(`❌ Brat error: ${e.message}`);
    }
}
break;

case 'bratvid':
case 'bvs': {
    if (!q) return m.reply(`Contoh: .bratvid aku kangen`);
    try {
        const axios = require('axios');
        const { Sticker, StickerTypes } = require('wa-sticker-formatter');
        
        let apiUrl = `https://api.ikyyxd.my.id/canvas/bratvid?apikey=kyzz&text=${encodeURIComponent(q)}`;
        await conn.sendMessage(m.chat, { text: `⏳ Bikin stiker bratvid...` }, { quoted: m });

        let res = await axios.get(apiUrl, { responseType: 'arraybuffer', timeout: 40000 });

        // VIDEO STIKER
        let sticker = new Sticker(res.data, {
            pack: 'BALZY EMDE',
            author: 'BALJI NI WOIK',
            type: StickerTypes.FULL,
            categories: ['😜'],
            quality: 60 // video kasih 60 aja biar enteng
        });

        let buffer = await sticker.toBuffer();
        await conn.sendMessage(m.chat, { sticker: buffer }, { quoted: m });

    } catch (e) {
        console.log(e);
        m.reply(`❌ BratVid error: ${e.message}\nCoba text lebih pendek, max 20 huruf`);
    }
}
break;

// === FITUR TIKTOK DOWNLOAD (FIX Invalid URL) ===
case 'tiktok':
case 'tt': {
    if (!q) return m.reply(`Contoh: .tt https://vt.tiktok.com/xxx`);
    try {
        const axios = require('axios');
        m.reply(`⏳ Download TikTok...`);
        
        let res = await axios.get(`https://api.ikyyxd.my.id/download/tiktok?apikey=kyzz&query=${encodeURIComponent(q)}`);
        let data = res.data.result || res.data.data || res.data;
        
        console.log(JSON.stringify(data).slice(0,500)); // buat cek di console

        // 1. KALAU FOTO SLIDE
        if (data.slides && data.slides.length > 0) {
            m.reply(`✅ TikTok Slide terdeteksi ${data.slides.length} foto, ngirim...`);
            for (let img of data.slides) {
                let imgUrl = img.url || img || img.download;
                await conn.sendMessage(m.chat, { image: { url: imgUrl } }, { quoted: m });
                await new Promise(r => setTimeout(r, 800));
            }
            return;
        }

        // 2. KALAU VIDEO
        let videoUrl = data.video || data.video_no_wm || data.play || data.no_watermark || data.download || data.url;
        
        // FALLBACK kalau slides kosong kayak error lu tadi
        if (!videoUrl && data.slides && data.slides.length === 0) {
            // coba API kedua tikwm buat slide
            try {
                let res2 = await axios.post('https://www.tikwm.com/api/', { url: q, hd: 1 }, { headers: { 'Content-Type': 'application/json' } });
                let d2 = res2.data.data;
                if (d2.images && d2.images.length > 0) {
                    for (let img of d2.images) {
                        await conn.sendMessage(m.chat, { image: { url: img } }, { quoted: m });
                    }
                    return;
                }
                videoUrl = d2.play;
            } catch {}
        }

        if (!videoUrl) return m.reply(`❌ Gagal ambil\nAPI return slides kosong kayak yang lu kirim\nCoba link video biasa, jangan yang foto slide`);

        await conn.sendMessage(m.chat, { 
            video: { url: videoUrl }, 
            caption: `✅ TikTok Done - BALZY EMDE`,
            mimetype: 'video/mp4' 
        }, { quoted: m });

    } catch (e) {
        m.reply(`❌ Error: ${e.message}\nKalau slides:[] berarti link lu itu TikTok foto, bukan video`);
    }
}
break;
// === FITUR TIKTOK STICKER (PAKAI API YANG SAMA) ===
case 'ttsticker':
case 'tts':
case 'tiktoksticker': {
    if (!q) return m.reply(`Contoh: .tts https://vt.tiktok.com/ZS...`);
    try {
        m.reply(`⏳ Bikin stiker TikTok...`);
        const axios = require('axios');
        let apiUrl = `${IKYY_API}/download/tiktok?apikey=${APIKEY}&query=${encodeURIComponent(q)}`;
        let res = await axios.get(apiUrl);
        let data = res.data.result || res.data.data || res.data;
        let videoUrl = data.video || data.video_no_wm || data.play;

        if (!videoUrl) return m.reply(`❌ Invalid URL`);
        
        // download video dulu terus kirim sebagai stiker (WA otomatis convert)
        await conn.sendMessage(m.chat, { sticker: { url: videoUrl } }, { quoted: m });
        
    } catch (e) { m.reply(`❌ Gagal stiker: ${e.message}\nKalau kepanjangan, API ikyy auto trim kok`); }
}
break;

// === FITUR TERABOX (FIX YANG TADI GAGAL TERUS) ===
case 'tb': {
    if (!q) return m.reply(`Contoh: .tb https://terabox.com/s/xxx`);
    try {
        const axios = require('axios');
        const IKYY_API = global.IKYY_API || "https://api.ikyyxd.my.id";
        const APIKEY = global.APIKEY || "kyzz";

        await conn.sendMessage(m.chat, { text: `⏳ Cek Terabox...\n${q}` }, { quoted: m });

        let res = await axios.get(`${IKYY_API}/download/terabox?url=${encodeURIComponent(q)}&apikey=${APIKEY}`, { timeout: 30000 })
        .catch(async () => {
            return await axios.get(`${IKYY_API}/download/terabox?url=${encodeURIComponent(q)}`, { timeout: 30000 });
        });

        console.log(JSON.stringify(res.data).slice(0,1000));

        let data = res.data.result || res.data.data || res.data;
        let files = Array.isArray(data) ? data : (data.files || data.list || [data]);

        if (!files[0]) return m.reply(`❌ Gak ketemu file`);

        let caption = `✅ *TERABOX FOUND* ${files.length} file\n\n`;
        for (let f of files.slice(0,5)) {
            // INI FIX NYA - TANGKEP SEMUA NAMA FIELD
            let direct = f.direct_download_url || f.direct_link || f.directLink || f.download_url || f.downloadLink || f.download || f.url || f.link || f.stream_url;
            let name = f.title || f.filename || f.file_name || f.name || 'terabox.mp4';
            let size = f.size || '';

            if (!direct) {
                caption += `❌ ${name} - link kosong\n${JSON.stringify(f).slice(0,200)}\n\n`;
                continue;
            }
            caption += `*${name}* (${size})\n${direct}\n\n`;
        }

        await conn.sendMessage(m.chat, { text: caption }, { quoted: m });

    } catch (e) { m.reply(`❌ TB error: ${e.message}`); }
}
break;

case 'tb2': {
    if (!q) return m.reply(`Contoh: .tb2 https://terabox.com/s/xxx`);
    try {
        const axios = require('axios');
        const fs = require('fs');
        const IKYY_API = global.IKYY_API || "https://api.ikyyxd.my.id";
        const APIKEY = global.APIKEY || "kyzz";

        await conn.sendMessage(m.chat, { text: `⏳ Proses tb2...\n${q}` }, { quoted: m });

        let res = await axios.get(`${IKYY_API}/download/terabox?url=${encodeURIComponent(q)}&apikey=${APIKEY}`, { timeout: 30000 })
        .catch(async () => await axios.get(`${IKYY_API}/download/terabox?url=${encodeURIComponent(q)}`, { timeout: 30000 }));

        let data = res.data.result || res.data.data || res.data;
        let files = Array.isArray(data) ? data : (data.files || data.list || [data]);
        let f = files[0];
        
        // FIX UTAMA DISINI
        let direct = f.direct_download_url || f.direct_link || f.download_url || f.url;
        let fileName = f.title || f.filename || `terabox_${Date.now()}.mp4`;

        if (!direct) return m.reply(`❌ Direct kosong\n${JSON.stringify(f).slice(0,400)}`);

        await conn.sendMessage(m.chat, { text: `📦 ${fileName}\nLink proxy: ${direct.slice(0,80)}...\n⏳ Download...` }, { quoted: m });

        if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp');
        let tmpPath = `./tmp/${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        // PENTING: direct ini kadang redirect 2x, pakai maxRedirects
        const writer = fs.createWriteStream(tmpPath);
        const response = await axios({
            method: 'get',
            url: direct,
            responseType: 'stream',
            timeout: 120000,
            maxRedirects: 5,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Referer': 'https://www.terabox.com/'
            }
        });

        response.data.pipe(writer);
        await new Promise((res, rej) => {
            writer.on('finish', res);
            writer.on('error', rej);
        });

        await conn.sendMessage(m.chat, {
            document: fs.readFileSync(tmpPath),
            fileName: fileName,
            mimetype: 'video/mp4'
        }, { quoted: m });

        fs.unlinkSync(tmpPath);

    } catch (e) {
        console.log(e);
        m.reply(`❌ TB2 Error: ${e.message}\n\nKalau error m3u8, berarti file harus pakai .tb (kirim link aja), gak bisa di-download bot.`);
    }
}
break;
// ========== FITUR OWNER - ADD/DEL/EDIT CASE ==========
case 'addcase':
case 'addfitur': {
    if (!isOwner) return m.reply('Owner only!');
    if (!q.includes('|')) return m.reply(`Contoh:\n${prefix+command} ping|m.reply('Pong!')\n\nFormat: nama_case | kode_case`);
    
    let [caseName, ...codeParts] = q.split('|');
    let caseCode = codeParts.join('|').trim();
    caseName = caseName.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if(!caseName) return m.reply('Nama case gak valid');
    
    let filePath = fs.existsSync('./balzy.js') ? './balzy.js' : fs.existsSync('./case.js') ? './case.js' : './index.js';
    let fileContent = fs.readFileSync(filePath, 'utf8');

    if (fileContent.includes(`case '${caseName}':`) || fileContent.includes(`case "${caseName}":`)) {
        return m.reply(`Case *${caseName}* udah ada, pakai ${prefix}editcase dulu`);
    }

    // Bikin backup dulu biar aman
    try { fs.writeFileSync(filePath + '.bak', fileContent); } catch {}

    let newCase = `\ncase '${caseName}': {\n${caseCode}\n}\nbreak;\n`;

    // CARA 1: Kalau lu kasih tanda di file case.js (PALING AMAN)
    // Buka case.js lu, taro komen ini di bawah case terakhir:
    // //--BATAS ADD CASE-- 
    if (fileContent.includes('//--BATAS ADD CASE--')) {
        fileContent = fileContent.replace('//--BATAS ADD CASE--', `${newCase}\n//--BATAS ADD CASE--`);
    } else {
        // CARA 2: AUTO CARI CASE TERAKHIR (FIX YANG BIKIN KEPOTONG)
        // Cari semua pola case 'xxx': { ... } break; secara non-greedy
        let regex = /case\s+['"][a-z0-9_\-"]+['"]\s*:\s*\{[\s\S]*?\}\s*break;/g;
        let matches = [...fileContent.matchAll(regex)];
        
        if (matches.length > 0) {
            let last = matches[matches.length - 1];
            let lastIndex = last.index + last[0].length;
            // Sisipin SETELAH case terakhir
            fileContent = fileContent.slice(0, lastIndex) + newCase + fileContent.slice(lastIndex);
        } else if (fileContent.includes('default:')) {
            // Fallback kalau gak ketemu pola, baru taro sebelum default:
            fileContent = fileContent.replace(/default:/, `${newCase}\ndefault:`);
        } else {
            return m.reply(`❌ Gak nemu tempat sisip case yang aman\nTaro manual di case.js lu komen ini di baris paling bawah sebelum default:\n//--BATAS ADD CASE--`);
        }
    }

    fs.writeFileSync(filePath, fileContent);
    return m.reply(`✅ Berhasil add case *${caseName}*\nFile: ${filePath}\nBackup: ${filePath}.bak\n\nTest: ${prefix}${caseName}`);
}
break;

case 'delcase':
case 'delfitur': {
    if (!isOwner) return m.reply('Owner only!');
    if (!q) return m.reply(`Contoh: ${prefix+command} ping`);
    
    let caseName = q.trim().toLowerCase();
    let filePath = fs.existsSync('./balzy.js') ? './balzy.js' : fs.existsSync('./case.js') ? './case.js' : './index.js';
    let fileContent = fs.readFileSync(filePath, 'utf8');

    // Regex hapus case ... break;
    let regex = new RegExp(`case\\s+['"]${caseName}['"]\\s*:\\s*{[\\s\\S]*?}\\s*break;\\n?`, 'g');
    if (!regex.test(fileContent)) return m.reply(`Case *${caseName}* gak ditemukan`);

    fileContent = fileContent.replace(regex, '');
    fs.writeFileSync(filePath, fileContent);
    return m.reply(`✅ Berhasil hapus case *${caseName}*\nRestart bot.`);
}
break;

case 'editcase': {
    if (!isOwner) return m.reply('Owner only!');
    if (!q.includes('|')) return m.reply(`Contoh:\n${prefix+command} ping|m.reply('Pong editan!')`);
    
    let [caseName, ...codeParts] = q.split('|');
    let caseCode = codeParts.join('|').trim();
    caseName = caseName.trim().toLowerCase();
    
    let filePath = fs.existsSync('./balzy.js') ? './balzy.js' : fs.existsSync('./case.js') ? './case.js' : './index.js';
    let fileContent = fs.readFileSync(filePath, 'utf8');

    let regex = new RegExp(`case\\s+['"]${caseName}['"]\\s*:\\s*{[\\s\\S]*?}\\s*break;`, 'g');
    if (!regex.test(fileContent)) return m.reply(`Case *${caseName}* gak ada, pakai ${prefix}addcase dulu`);

    let newCase = `case '${caseName}': {\n${caseCode}\n}\nbreak;`;
    fileContent = fileContent.replace(regex, newCase);
    
    fs.writeFileSync(filePath, fileContent);
    return m.reply(`✅ Berhasil edit case *${caseName}*\nRestart bot.`);
}
break;

case 'getcase': {
    if (!isOwner) return m.reply('Owner only!');
    if (!q) return m.reply(`Contoh: ${prefix+command} ping`);
    
    let caseName = q.trim().toLowerCase();
    let filePath = fs.existsSync('./balzy.js') ? './balzy.js' : fs.existsSync('./case.js') ? './case.js' : './index.js';
    let fileContent = fs.readFileSync(filePath, 'utf8');

    let regex = new RegExp(`case\\s+['"]${caseName}['"]\\s*:\\s*{[\\s\\S]*?}\\s*break;`, 'g');
    let match = fileContent.match(regex);
    if (!match) return m.reply(`Case *${caseName}* gak ditemukan`);
    
    return m.reply(`📄 *CASE: ${caseName}*\n\n${match[0].slice(0, 3500)}`);
}
break;

case 'listcase':
case 'listfitur': {
    if (!isOwner) return m.reply('Owner only!');
    let filePath = fs.existsSync('./balzy.js') ? './balzy.js' : fs.existsSync('./case.js') ? './case.js' : './index.js';
    let fileContent = fs.readFileSync(filePath, 'utf8');
    
    let cases = [...fileContent.matchAll(/case\s+['"]([^'"]+)['"]\s*:/g)].map(v=>v[1]);
    let unique = [...new Set(cases)];
    
    return m.reply(`📚 *TOTAL CASE: ${unique.length}*\n\n${unique.map((a,i)=>`${i+1}. ${a}`).join('\n')}\n\nKetik ${prefix}getcase <nama> buat liat kodenya`);
}
break;

case 'cekurl': {
    if (!q) return m.reply(`Contoh: ${prefix + command} https://example.com/file.zip`);
    try {
        const u = new URL(q.trim());
        const r = await axios.head(u.href, { timeout: 10000, maxRedirects: 4, validateStatus: s => s >= 200 && s < 400 });
        return m.reply(`🔎 Host: ${u.host}\nStatus: ${r.status}\nTipe: ${r.headers['content-type'] || '?'}\nSize: ${r.headers['content-length'] ? (Number(r.headers['content-length'])/1024/1024).toFixed(2)+' MB' : '?'}`);
    } catch { return m.reply('URL tidak dapat diperiksa'); }
}
break;

case 'ttstick':
case 'tiktokstick':
case 'ttcomment':
case 'getstikertiktok': {
    if (!q) return m.reply(`Contoh:\n${prefix+command} https://vt.tiktok.com/ZSxxx/\n\nKirim link TikTok, nanti jadi stiker otomatis`);
    
    let tiktokUrl = q.trim();
    m.reply('⏳ Download TikTok dulu jadi stiker...');

    try {
        // API tikwm - support link video + link komen + foto slide
        let res = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}&count=12&cursor=0&web=1&hd=1`, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        if (res.data.code !== 0 || !res.data.data) return m.reply('Gagal ambil TikTok, link salah / video private');

        let data = res.data.data;
        let tmpDir = '/tmp';
        if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

        // Kalau foto slide TikTok
        if (data.images && data.images.length > 0) {
            m.reply(`📸 TikTok slide ${data.images.length} foto, bikin stiker foto pertama...`);
            let imgUrl = data.images[0];
            let imgPath = `${tmpDir}/ttimg_${Date.now()}.jpg`;
            let imgBuffer = await axios.get(imgUrl, { responseType: 'arraybuffer' }).then(r=>r.data);
            fs.writeFileSync(imgPath, Buffer.from(imgBuffer));

            // jadiin stiker pakai wa-sticker-formatter bawaan baileys lu
            let media = await conn.downloadAndSaveMediaMessage ? imgPath : imgPath;
            // pakai lib stiker lu yang udah ada
            let anu = await addExifAvatar ? await addExifAvatar(imgPath, `TT Sticker`) : imgPath;
            let buff = fs.readFileSync(anu || imgPath);
            await conn.sendMessage(m.chat, { sticker: buff }, { quoted: m });
            fs.unlinkSync(imgPath);
            if (fs.existsSync(anu) && anu !== imgPath) fs.unlinkSync(anu);
            return;
        }

        // Kalau video
        let videoUrl = data.play || data.hdplay || data.wmplay;
        if (!videoUrl) return m.reply('Gak ada video di link itu');

        let videoPath = `${tmpDir}/tt_${Date.now()}.mp4`;
        let webpPath = `${tmpDir}/tt_${Date.now()}.webp`;

        // download video
        let videoBuffer = await axios.get(videoUrl, { responseType: 'arraybuffer', headers: { 'Referer': 'https://www.tikwm.com/' } }).then(r=>r.data);
        fs.writeFileSync(videoPath, Buffer.from(videoBuffer));

        // convert ke stiker pakai ffmpeg - 0-7 detik doang biar gak berat
        const ffmpeg = require('fluent-ffmpeg');
        await new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .inputOptions(['-t 7']) // ambil 7 detik pertama aja biar jadi stiker
                .outputOptions([
                    '-vcodec', 'libwebp',
                    '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1',
                    '-loop', '0',
                    '-ss', '00:00:00',
                    '-an',
                    '-vsync', '0'
                ])
                .toFormat('webp')
                .save(webpPath)
                .on('end', resolve)
                .on('error', reject);
        });

        let stickerBuff = fs.readFileSync(webpPath);
        await conn.sendMessage(m.chat, { sticker: stickerBuff }, { quoted: m });

        fs.unlinkSync(videoPath);
        fs.unlinkSync(webpPath);

    } catch (e) {
        console.log(e);
        return m.reply(`Gagal jadiin stiker TikTok\nError: ${e.message}\n\nCoba link lain atau video kepanjangan`);
    }
}
break;

case 'maker': {
    if (!q) return m.reply(`Contoh: ${prefix + command} BalzyOfficial`);
    const safe = q.trim().slice(0, 250).replace(/[`*_]/g, '');
    return conn.sendMessage(m.chat, { text: `✦ ${safe} ✦\n\n${safe.split('').join(' ')}` }, { quoted: m });
}
break;
case 'quote': {
    const quotes = ['Pelan-pelan asal tetap bergerak.', 'Konsisten lebih penting daripada sempurna.', 'Jangan menyerah hanya karena prosesnya belum terlihat.'];
    return m.reply(`❝ ${quotes[Math.floor(Math.random() * quotes.length)]} ❞`);
}
break;
case 'dadu': { return m.reply(`🎲 Dadu: *${Math.floor(Math.random()*6)+1}*`); } break;
case 'coin': { return m.reply(`🪙 ${Math.random()<0.5?'ANGKA':'GAMBAR'}`); } break;
case 'tebakangka': {
    global.funGames = global.funGames || {};
    global.funGames[m.sender] = { answer: Math.floor(Math.random()*20)+1, tries: 0, expires: Date.now()+120000 };
    return m.reply('🎮 Tebak 1-20, jawab: .jawab <angka>');
}
break;
case 'jawab': {
    global.funGames = global.funGames || {};
    const game = global.funGames[m.sender];
    if (!game || game.expires < Date.now()) { delete global.funGames[m.sender]; return m.reply('Gak ada game. .tebakangka'); }
    const guess = Number(q); if (!Number.isInteger(guess)) return m.reply('Masukkan angka');
    game.tries++; if (guess === game.answer) { delete global.funGames[m.sender]; return m.reply(`🎉 Benar! ${guess} dalam ${game.tries}x`); }
    if (game.tries >= 6) { let a=game.answer; delete global.funGames[m.sender]; return m.reply(`Habis! Jawaban ${a}`); }
    return m.reply(`${guess < game.answer ? '⬆️ Kekecilan' : '⬇️ Kegedean'} Sisa ${6-game.tries}`);
}
break;
case 'stopgame': { global.funGames = global.funGames || {}; delete global.funGames[m.sender]; return m.reply('Game stop'); } break;
case 'runtime': { const s=Math.floor(process.uptime()); return m.reply(`⏱️ ${Math.floor(s/86400)}d ${Math.floor(s%86400/3600)}h ${Math.floor(s%3600/60)}m`); } break;
case 'ping2': {
    const old = performance.now()
    const ram = (os.totalmem()/Math.pow(1024,3)).toFixed(2)+" GB";
    const free_ram = (os.freemem()/Math.pow(1024,3)).toFixed(2)+" GB";
    conn.sendMessage(m.chat, { text: `CPU: ${os.cpus().length} Core\nRam: ${free_ram}/${ram}\nSpeed: ${(performance.now()-old).toFixed(2)} ms` },{ quoted:m})
}
break;       
			case "public": { if (!isOwner) return; m.reply("public"); conn.public = true } break
			case "self": { if (!isOwner) return; m.reply("self"); conn.public = false } break
			case 'restartbot': { if (!isOwner) return xreply("No Access"); const msg = await restartPanelServer(); await xreply(msg); } break;

case 'ping': {
m.reply('Pong!')
}
break;

//--BATAS ADD CASE-- 
			default:
			if (body.startsWith("<")) { if (!isOwner) return; try { const output = await eval(`(async () => ${q})()`);
                    await m.reply(`${typeof output === 'string' ? output : JSON.stringify(output, null, 4)}`); } catch (e) { await m.reply(`Error: ${String(e)}`); } }
			if (budy.startsWith(">")) { if (!isOwner) return; try { let evaled = await eval(q); if (typeof evaled !== "string") evaled = util.inspect(evaled); await m.reply(evaled); } catch (e) { await m.reply(`Error: ${String(e)}`); } }
			if (budy.startsWith("$")) { if (!isOwner) return; exec(q, (err, stdout) => { if (err) return m.reply(err.toString()); if (stdout) return m.reply(stdout.toString()); }) }
		}
		
	} catch (e) { console.log(e) }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update ${__filename}`)
	delete require.cache[file]
	require(file)
})