let whitelistDomain = [
    // 検索エンジン
    "google.com",
    "bing.com",
    // "yahoo.co.jp",
    // "duckduckgo.com",
    // 高信頼性のTLD
    "co.jp",
    "go.jp",
    "ac.jp",
    "ne.jp",
    // "or.jp",
    // Developer
    // "mimimimineko.com",
    // "taksas.net",
    // アクセス数が多いサイト
    "youtube.com",
    "twitter.com",
    "zoom.us",
    "amazon.com",
    "slack.com",
    "webex.com",
    "discord.com",
    "github.com",
    "microsoft.com",
    "x.com",
];
let blacklistDomain = [
    "duckdns.org",
    "cn",
    "ru",
    "is"
    // "top",
    // "xyz"
]
// Amazon
let amazonTitle = /Amazonサインイン/
let amazonDomain = [
    "amazon.com",
    "amazon.co.jp"
];
// au ID
let auIDTitle = /au IDログイン/
let auIDDomain = [
    "auone.jp",
    "au.com",
    "kddi.com"
]
// JR East
let JREastEkinet = /えきねっと（JR東日本）/
let JREastSuica = /JR東日本：モバイルSuica＞ログイン/
let JREastDomain = [
    "eki-net.com",
    "jreast-timetable.jp",
    "mobilesuica.com",
    "dokokani-eki-net.com",
    "jreast.co.jp"
]
// AEON
let aeonTitle = /イオンカード　暮らしのマネーサイト/
let aeonDomain = [
    "aeonretail.jp",
    "aeon.co.jp",
    "aeoncredit.co.jp",
    "aeonbank.co.jp"
]
// SMBC
// smbc-card
let SMBCTitle = /SMBCダイレクトログイン ： SMBCダイレクト/
let smbcCardTitle = /三井住友カード会員向けサービス「Vpass」ログイン/
let SMBCDomain = [
    "smbc-card.com",
    "smbc.co.jp",
]
// mercari
let mercariTitle = /ログイン - メルカリ/
let mercariDomain = [
    "mercari.com",
    "mercari.jp"
]
// ETC
let etcTitle = /ETC利用照会サービス/
let etcDomain = [
    "etc-meisai.jp"
]
// JP Post
let jpPostTitle = /ゆうびんポータル - 日本郵便/
let jpPostDomain = [
    "post.japanpost.jp",
    "japanpost.jp"
]


// 各企業のタイトルとドメインのリストをまとめる
let titleDomainList = [
    [amazonTitle, amazonDomain],
    [auIDTitle, auIDDomain],
    [JREastEkinet, JREastDomain],
    [JREastSuica, JREastDomain],
    [aeonTitle, aeonDomain],
    [SMBCTitle, SMBCDomain],
    [smbcCardTitle, SMBCDomain],
    [mercariTitle, mercariDomain],
    [etcTitle, etcDomain],
    [jpPostTitle, jpPostDomain]
]

// アラートを出す関数
function alertPhishing(content){
    window.alert("//////////フィッシングの恐れあり//////////\nリンクを確認してください.\n\n理由\n"+content+"\n\nこの警告は拡張機能「Kadai-Portal」によるものです。\n誤検知など不具合はmimimimineko.comまで\n")
}

document.addEventListener('DOMContentLoaded', function(){
    const domain  = location.hostname;
    let title   = document.title;
    console.log(title + "   :   " +domain);
    // ホワイトリスト
    for(let i=0; i<whitelistDomain.length; i++){
        if(domain.endsWith(whitelistDomain[i])){
            console.log("Kadai-Portal: OK Matched Whitelist : "+ whitelistDomain[i]);
            return;
        }
    }
    // ブラックリスト
    for(let i=0; i<blacklistDomain.length; i++){
        if(domain.endsWith(blacklistDomain[i])){
            console.log("Kadai-Portal: NG Matched Blacklist");
            alertPhishing("ブラックリストに登録されているドメイン : "+ blacklistDomain[i]);
            return;
        }
    }

    // 代表的なサイトについてはタイトルとドメインをチェック-->不具合
    // for(let i=0; i<titleDomainList.length; i++){
    //     if(title.match(titleDomainList[i][0])){
    //         if(titleDomainList[i][1].includes(domain)){
    //             console.log("Kadai-Portal: OK Matched Title and Domain");
    //             return;
    //         }else{
    //             console.log("Kadai-Portal: NG Matched Title but not Domain");
    //             alertPhishing("タイトルとドメインの組み合わせが不正");
    //             return;
    //         }
    //     }
    // }

    // 代表的なサイトについてはタイトルとドメインをチェック
    // タイトルをチェックし、一致したらドメインをチェック
    for(let i=0; i<titleDomainList.length; i++){
        // titleの一致
        if(title.match(titleDomainList[i][0])){
            for(let j=0; j<titleDomainList[i][1].length; j++){
                // domainの一致
                if(domain.endsWith(titleDomainList[i][1][j])){
                    console.log("Kadai-Portal: OK Matched Title and Domain");
                    return;
                }
            }
            console.log("Kadai-Portal: NG Matched Title but not Domain");
            alertPhishing("タイトルとドメインの組み合わせが不正");
            return;
        }
    }
    console.log("Kadai-Portal: Not Matched : "+ title + "   :   " +domain);
})
