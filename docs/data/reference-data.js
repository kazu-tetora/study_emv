// ===================================================
// EMV Reference Data - Commands and Tags
// ===================================================

const CMD_DATA = [
  {
    name: "GENERATE AC",
    cla: "80",
    ins: "AE",
    description: "トランザクション証明書（TC、ARQC、またはAAC）をカードに要求するコマンド。ターミナルリスク管理などの結果に基づいて発行される。",
    relatedSpecs: ["Book 3 - Chapter 6.5", "Book 3 - Chapter 9"],
    category: "Crypto"
  },
  {
    name: "GET PROCESSING OPTIONS (GPO)",
    cla: "80",
    ins: "A8",
    description: "アプリケーション処理を開始するコマンド。PDOL（Processing Options Data Object List）で要求されたデータをカードに渡し、AIP（Application Interchange Profile）とAFL（Application File Locator）を取得する。",
    relatedSpecs: ["Book 3 - Chapter 6.6"],
    category: "Init"
  },
  {
    name: "READ RECORD",
    cla: "00",
    ins: "B2",
    description: "SFI（Short File Identifier）とレコード番号を指定して、ICC上のリニアファイルのレコード（データオブジェクト）を読み取るコマンド。",
    relatedSpecs: ["Book 1 - Chapter 11.2", "Book 3 - Chapter 6.10"],
    category: "Data"
  },
  {
    name: "SELECT",
    cla: "00",
    ins: "A4",
    description: "ファイルIDまたはAID（Application Identifier）を使用して、PSEまたはADF（アプリケーション）を選択するコマンド。FCI（File Control Information）を返す。",
    relatedSpecs: ["Book 1 - Chapter 11.3"],
    category: "Init"
  },
  {
    name: "GET DATA",
    cla: "80",
    ins: "CA",
    description: "特定のデータオブジェクト（ATC、PIN Try Counter、ログデータ等）をカードから読み取るコマンド。",
    relatedSpecs: ["Book 3 - Chapter 6.4"],
    category: "Data"
  },
  {
    name: "PUT DATA",
    cla: "04",
    ins: "DA",
    description: "指定されたデータオブジェクトをカード（特定のファイル等）に書き込むプロプライエタリなコマンド。イシュアスクリプト等で使用される。",
    relatedSpecs: ["Book 3 - Chapter 6.9"],
    category: "Data"
  },
  {
    name: "VERIFY",
    cla: "00",
    ins: "20",
    description: "オフラインPINをカードに送信し、カード内の参照データ（PIN）と照合するコマンド。平文または暗号化された状態で送られる。",
    relatedSpecs: ["Book 3 - Chapter 6.11", "Book 2 - Chapter 7"],
    category: "CVM"
  },
  {
    name: "EXTERNAL AUTHENTICATE",
    cla: "00",
    ins: "82",
    description: "発行者（Issuer）からターミナルを経由して送られた暗号文（ARPC等）をカードが検証するコマンド。イシュア認証に使用される。",
    relatedSpecs: ["Book 3 - Chapter 6.3"],
    category: "Crypto"
  },
  {
    name: "INTERNAL AUTHENTICATE",
    cla: "00",
    ins: "88",
    description: "DDAプロセスの一部として、カードに動的署名の生成（署名用暗号データの作成）を要求するコマンド。",
    relatedSpecs: ["Book 3 - Chapter 6.7"],
    category: "Crypto"
  },
  {
    name: "PIN CHANGE/UNBLOCK",
    cla: "84",
    ins: "24",
    description: "カードのPINをブロック解除する、および/または新しいPINに変更するコマンド。通常はイシュアスクリプト経由で実行される。",
    relatedSpecs: ["Book 3 - Chapter 6.8"],
    category: "CVM"
  },
  {
    name: "EXCHANGE RELAY RESISTANCE DATA",
    cla: "80",
    ins: "EA",
    description: "リレー攻撃（Relay Attack）への耐性を高めるため、リーダーとカード間でタイミング検証用データを交換するコマンド。（Contactless Kernel特有）",
    relatedSpecs: ["Kernel 2 - Chapter 5"],
    category: "Crypto"
  }
];

const TAG_DATA = [
  // --- 4x Series: Identification ---
  { tag: "42", name: "Issuer Identification Number (IIN)", format: "n 6", length: "3", source: "ICC", description: "カード発行会社を識別するための番号。" },
  { tag: "4F", name: "Application Identifier (AID) - card", format: "b", length: "5-16", source: "ICC", description: "カード上のアプリケーションを一意に識別する。RIDとPIXで構成される。" },

  // --- 5x Series: Card & Account ---
  { tag: "50", name: "Application Label", format: "ans", length: "1-16", source: "ICC", description: "カード保有者に表示するアプリケーション名。" },
  { tag: "57", name: "Track 2 Equivalent Data", format: "b", length: "var. up to 19", source: "ICC", description: "磁気ストライプのトラック2と同等のデータ（PAN、有効期限等）。" },
  { tag: "5A", name: "Application Primary Account Number (PAN)", format: "cn", length: "var. up to 10", source: "ICC", description: "クレジットカード等の会員番号。" },
  { tag: "5F20", name: "Cardholder Name", format: "ans", length: "2-26", source: "ICC", description: "カード保有者の氏名。" },
  { tag: "5F24", name: "Application Expiration Date", format: "n 6 (YYMMDD)", length: "3", source: "ICC", description: "アプリケーションの有効期限。" },
  { tag: "5F25", name: "Application Effective Date", format: "n 6 (YYMMDD)", length: "3", source: "ICC", description: "アプリケーションの有効開始日。" },
  { tag: "5F28", name: "Issuer Country Code", format: "n 3", length: "2", source: "ICC", description: "発行国のISO 3166国番号。" },
  { tag: "5F2A", name: "Transaction Currency Code", format: "n 3", length: "2", source: "Terminal", description: "取引通貨のISO 4217コード。" },
  { tag: "5F2D", name: "Language Preference", format: "an 2", length: "2-8", source: "ICC", description: "優先言語コード。" },
  { tag: "5F30", name: "Service Code", format: "n 3", length: "2", source: "ICC", description: "ISO 7813準拠のサービスコード。" },
  { tag: "5F34", name: "Application PAN Sequence Number", format: "n 2", length: "1", source: "ICC", description: "同じPANのカードを区別する番号。" },
  { tag: "5F36", name: "Transaction Currency Exponent", format: "n 1", length: "1", source: "Terminal", description: "取引通貨の小数点位置。" },
  { tag: "5F50", name: "Issuer URL", format: "ans", length: "var.", source: "ICC", description: "イシュアのウェブサイトURL。" },
  { tag: "5F53", name: "IBAN", format: "b", length: "var.", source: "ICC", description: "国際銀行勘定番号。" },
  { tag: "5F54", name: "Bank Identifier Code (BIC)", format: "b", length: "var.", source: "ICC", description: "銀行を識別するためのSWIFTコード。" },

  // --- 6x Series: Templates ---
  { tag: "61", name: "Application Template", format: "b", length: "var.", source: "ICC", description: "アプリケーション選択時に返されるテンプレート。" },
  { tag: "6F", name: "FCI Template", format: "b", length: "var.", source: "ICC", description: "ファイル制御情報のテンプレート。" },

  // --- 7x Series: Templates & Scripts ---
  { tag: "70", name: "AEF Data Template", format: "b", length: "var.", source: "ICC", description: "READ RECORDコマンドで読み取られるデータのテンプレート。" },
  { tag: "71", name: "Issuer Script Template 1", format: "b", length: "var.", source: "Host", description: "承認前に実行されるイシュアスクリプト。" },
  { tag: "72", name: "Issuer Script Template 2", format: "b", length: "var.", source: "Host", description: "承認後に実行されるイシュアスクリプト。" },
  { tag: "73", name: "Directory Discretionary Template", format: "b", length: "var.", source: "ICC", description: "ディレクトリ選択時のプロプライエタリなデータ。" },
  { tag: "77", name: "Response Message Template Format 2", format: "b", length: "var.", source: "ICC", description: "TLV形式のレスポンスメッセージテンプレート。" },

  // --- 8x Series: Controls & Auth ---
  { tag: "80", name: "Response Message Template Format 1", format: "b", length: "var.", source: "ICC", description: "固定長/非TLV形式のレスポンスメッセージ。" },
  { tag: "81", name: "Amount, Authorised (Binary)", format: "b", length: "4", source: "Terminal", description: "バイナリ形式の承認金額。" },
  { tag: "82", name: "Application Interchange Profile (AIP)", format: "b", length: "2", source: "ICC", description: "カードのサポート機能を示すフラグ。" },
  { tag: "83", name: "Command Template", format: "b", length: "var.", source: "Terminal", description: "GPO等のコマンドに含めるデータのテンプレート。" },
  { tag: "84", name: "Dedicated File (DF) Name", format: "b", length: "5-16", source: "ICC", description: "アプリケーションのファイル名（通常はAID）。" },
  { tag: "86", name: "Issuer Script Command", format: "b", length: "var.", source: "Host", description: "イシュアスクリプト内の個別のコマンド。" },
  { tag: "87", name: "Application Priority Indicator", format: "b", length: "1", source: "ICC", description: "アプリ選択時の優先順位。" },
  { tag: "88", name: "Short File Identifier (SFI)", format: "b", length: "1", source: "ICC", description: "ファイルを指定するための短い識別子（1-30）。" },
  { tag: "89", name: "Authorisation Code", format: "an 6", length: "6", source: "Host", description: "承認結果を示すコード。" },
  { tag: "8A", name: "Authorization Response Code (ARC)", format: "an 2", length: "2", source: "Terminal/Host", description: "承認結果の詳細ステータスコード。" },
  { tag: "8C", name: "CDOL1", format: "b", length: "var.", source: "ICC", description: "1回目のGenerate ACで必要なデータのリスト。" },
  { tag: "8D", name: "CDOL2", format: "b", length: "var.", source: "ICC", description: "2回目のGenerate ACで必要なデータのリスト。" },
  { tag: "8E", name: "CVM List", format: "b", length: "var.", source: "ICC", description: "サポートする本人確認方法（CVM）のリスト。" },
  { tag: "8F", name: "Certification Authority Public Key Index", format: "b", length: "1", source: "ICC", description: "CA公開鍵のインデックス。" },

  // --- 9x Series: Risk & Crypto ---
  { tag: "90", name: "Issuer Public Key Certificate", format: "b", length: "var.", source: "ICC", description: "イシュアの公開鍵証明書。" },
  { tag: "91", name: "Issuer Authentication Data", format: "b", length: "8-16", source: "Host", description: "イシュア認証用の暗号データ。" },
  { tag: "92", name: "Issuer Public Key Remainder", format: "b", length: "var.", source: "ICC", description: "イシュア公開鍵のはみ出し部分（剰余）。" },
  { tag: "93", name: "Signed Static Application Data", format: "b", length: "var.", source: "ICC", description: "SDA用の署名付き固定データ。" },
  { tag: "94", name: "Application File Locator (AFL)", format: "b", length: "var.", source: "ICC", description: "読み取るべきデータファイルの所在を示すリスト。" },
  { tag: "95", name: "Terminal Verification Results (TVR)", format: "b", length: "5", source: "Terminal", description: "ターミナルによる各種チェックの結果フラグ。" },
  { tag: "97", name: "Transaction Certificate DOL (TDOL)", format: "b", length: "var.", source: "ICC", description: "TC生成に必要なターミナルデータのリスト。" },
  { tag: "98", name: "TC Hash Value", format: "b", length: "20", source: "ICC", description: "トランザクション証明書（TC）のハッシュ値。" },
  { tag: "99", name: "Transaction PIN Data", format: "b", length: "var.", source: "Terminal", description: "暗号化された本人確認用のPIN。" },
  { tag: "9A", name: "Transaction Date", format: "n 6 (YYMMDD)", length: "3", source: "Terminal", description: "取引実行日。" },
  { tag: "9B", name: "Transaction Status Information (TSI)", format: "b", length: "2", source: "Terminal", description: "実行された処理のステータス情報。" },
  { tag: "9C", name: "Transaction Type", format: "n 2", length: "1", source: "Terminal", description: "取引の種類（売上、返品等）。" },
  { tag: "9D", name: "DDF Name", format: "b", length: "5-16", source: "ICC", description: "ディレクトリ定義ファイル（DDF）の名前。" },

  // --- 9F Series: Extended Tags ---
  { tag: "9F01", name: "Acquirer Identifier", format: "n 6-11", length: "6", source: "Terminal", description: "アクワイアラ（加盟店契約会社）の識別子。" },
  { tag: "9F02", name: "Amount, Authorised (Numeric)", format: "n 12", length: "6", source: "Terminal", description: "承認要求金額。" },
  { tag: "9F03", name: "Amount, Other (Numeric)", format: "n 12", length: "6", source: "Terminal", description: "キャッシュバック等のその他の金額。" },
  { tag: "9F04", name: "Amount, Other (Binary)", format: "b", length: "4", source: "Terminal", description: "追加金額のバイナリ形式。" },
  { tag: "9F05", name: "Application Discretionary Data", format: "b", length: "1-32", source: "ICC", description: "イシュア独自のアプリケーション用予備データ。" },
  { tag: "9F06", name: "Application Identifier (AID) - terminal", format: "b", length: "5-16", source: "Terminal", description: "ターミナル設定のAID。" },
  { tag: "9F07", name: "Application Usage Control (AUC)", format: "b", length: "2", source: "ICC", description: "カードの利用可能範囲（国内/海外、ATM/POS等）を規定。" },
  { tag: "9F08", name: "Application Version Number (ICC)", format: "b", length: "2", source: "ICC", description: "カード側のアプリバージョン。" },
  { tag: "9F09", name: "Application Version Number (Terminal)", format: "b", length: "2", source: "Terminal", description: "ターミナル側のアプリバージョン。" },
  { tag: "9F0B", name: "Cardholder Name Extended", format: "ans", length: "27-45", source: "ICC", description: "収まりきらなかった長文の氏名。" },
  { tag: "9F0D", name: "Issuer Action Code - Default", format: "b", length: "5", source: "ICC", description: "オンライン不可時のオフライン承認/拒否の判断基準。" },
  { tag: "9F0E", name: "Issuer Action Code - Denial", format: "b", length: "5", source: "ICC", description: "オフラインで即座に拒否するかどうかの判断基準。" },
  { tag: "9F0F", name: "Issuer Action Code - Online", format: "b", length: "5", source: "ICC", description: "オンライン不可の場合にオフライン拒否するかどうかの判断基準。" },
  { tag: "9F10", name: "Issuer Application Data (IAD)", format: "b", length: "var.", source: "ICC", description: "イシュア独自のトランザクション情報。" },
  { tag: "9F11", name: "Issuer Code Table Index", format: "n 2", length: "1", source: "ICC", description: "表示用の文字セットを指定。" },
  { tag: "9F12", name: "Application Preferred Name", format: "ans", length: "1-16", source: "ICC", description: "特定の言語向けのアプリケーション優先表示名。" },
  { tag: "9F13", name: "Last Online ATC Register", format: "b", length: "2", source: "ICC", description: "最後にオンライン承認された時のATCの値。" },
  { tag: "9F14", name: "Lower Consecutive Offline Limit (LCOL)", format: "b", length: "1", source: "ICC", description: "オンライン必須となるまでの連続オフライン取引制限回数（低）。" },
  { tag: "9F15", name: "Merchant Category Code (MCC)", format: "n 4", length: "2", source: "Terminal", description: "加盟店の業種を示すコード。" },
  { tag: "9F16", name: "Merchant Identifier", format: "ans 15", length: "15", source: "Terminal", description: "加盟店を一意識別するためのID。" },
  { tag: "9F17", name: "PIN Try Counter", format: "b", length: "1", source: "ICC", description: "残りPIN試行可能回数。" },
  { tag: "9F18", name: "Issuer Script Identifier", format: "b", length: "4", source: "Host", description: "発行者スクリプトの一連番号。" },
  { tag: "9F1A", name: "Terminal Country Code", format: "n 3", length: "2", source: "Terminal", description: "ターミナル設置国のコード。" },
  { tag: "9F1B", name: "Terminal Floor Limit", format: "b", length: "4", source: "Terminal", description: "オフライン承認可能な金額の上限。" },
  { tag: "9F1C", name: "Terminal Identification", format: "ans 8", length: "8", source: "Terminal", description: "個別のターミナルを識別するID。" },
  { tag: "9F1D", name: "Terminal Risk Management Data", format: "b", length: "1-8", source: "Terminal", description: "ターミナルが実施したリスク管理情報。" },
  { tag: "9F1E", name: "Interface Device (IFD) Serial Number", format: "an 8", length: "8", source: "Terminal", description: "ターミナルのシリアル番号。" },
  { tag: "9F1F", name: "Track 1 Discretionary Data", format: "ans", length: "var.", source: "ICC", description: "磁気ストライプのトラック1形式の自由領域データ。" },
  { tag: "9F20", name: "Track 2 Discretionary Data", format: "cn", length: "var.", source: "ICC", description: "磁気ストライプのトラック2形式の自由領域データ。" },
  { tag: "9F21", name: "Transaction Time", format: "n 6 (HHMMSS)", length: "3", source: "Terminal", description: "取引発生時刻。" },
  { tag: "9F22", name: "Certification Authority Public Key Index (Terminal)", format: "b", length: "1", source: "Terminal", description: "ターミナルが使用するCA公開鍵インデックス。" },
  { tag: "9F23", name: "Upper Consecutive Offline Limit (UCOL)", format: "b", length: "1", source: "ICC", description: "オンライン必須となるまでの連続オフライン取引制限回数（高）。" },
  { tag: "9F26", name: "Application Cryptogram (AC)", format: "b", length: "8", source: "ICC", description: "Generate ACでカードが生成した暗号文。" },
  { tag: "9F27", name: "Cryptogram Information Data (CID)", format: "b", length: "1", source: "ICC", description: "暗号文の種類（ARQC, TC, AAC）を示すフラグ。" },
  { tag: "9F2D", name: "ICC PIN Encipherment Public Key Certificate", format: "b", length: "var.", source: "ICC", description: "PIN暗号化用のICC公開鍵証明書。" },
  { tag: "9F2E", name: "ICC PIN Encipherment Public Key Exponent", format: "b", length: "1 or 3", source: "ICC", description: "PIN暗号化用のICC公開鍵指数。" },
  { tag: "9F2F", name: "ICC PIN Encipherment Public Key Remainder", format: "b", length: "var.", source: "ICC", description: "PIN暗号化用のICC公開鍵剰余。" },
  { tag: "9F32", name: "Issuer Public Key Exponent", format: "b", length: "1 or 3", source: "ICC", description: "イシュア公開鍵の指数。" },
  { tag: "9F33", name: "Terminal Capabilities", format: "b", length: "3", source: "Terminal", description: "ターミナルのハードウェア能力（IC読取、CVM入力等）。" },
  { tag: "9F34", name: "Cardholder Verification Method (CVM) Results", format: "b", length: "3", source: "Terminal", description: "本取引で実施された本人確認の結果。" },
  { tag: "9F35", name: "Terminal Type", format: "n 2", length: "1", source: "Terminal", description: "ターミナルの属性（有人/無人、オンライン状況等）。" },
  { tag: "9F36", name: "Application Transaction Counter (ATC)", format: "b", length: "2", source: "ICC", description: "取引毎に1ずつ増加するカウンター。" },
  { tag: "9F37", name: "Unpredictable Number", format: "b", length: "4", source: "Terminal", description: "暗号文生成時のランダム性を担保するための乱数。" },
  { tag: "9F38", name: "Processing Options Data Object List (PDOL)", format: "b", length: "var.", source: "ICC", description: "GPOコマンドで必要となるターミナルデータの定義。" },
  { tag: "9F39", name: "Point-of-Service (POS) Entry Mode", format: "n 2", length: "1", source: "Terminal", description: "カードデータの読み取り方式。" },
  { tag: "9F3A", name: "Amount, Authorised (Binary)", format: "b", length: "4", source: "Terminal", description: "バイナリ形式の取引金額。" },
  { tag: "9F3B", name: "Application Reference Currency", format: "n 3", length: "2", source: "ICC", description: "カードが内部基準とする通貨コード。" },
  { tag: "9F3C", name: "Transaction Reference Currency Code", format: "n 3", length: "2", source: "Terminal", description: "ターミナルの基準通貨コード。" },
  { tag: "9F3D", name: "Transaction Reference Currency Exponent", format: "n 1", length: "1", source: "Terminal", description: "基準通貨の小数点位置。" },
  { tag: "9F40", name: "Additional Terminal Capabilities", format: "b", length: "5", source: "Terminal", description: "ターミナルの詳細な追加機能フラグ。" },
  { tag: "9F41", name: "Transaction Sequence Counter", format: "n 4-8", length: "2-4", source: "Terminal", description: "一連の取引を番号付けするためのカウンター。" },
  { tag: "9F42", name: "Application Currency Code", format: "n 3", length: "2", source: "ICC", description: "カードに設定された基本通貨コード。" },
  { tag: "9F43", name: "Application Reference Currency Exponent", format: "n 1", length: "1", source: "ICC", description: "基準通貨の小数点位置（カード側）。" },
  { tag: "9F44", name: "Application Currency Exponent", format: "n 1", length: "1", source: "ICC", description: "基本通貨の小数点位置（カード側）。" },
  { tag: "9F45", name: "Data Authentication Code", format: "b", length: "2", source: "ICC", description: "静的データ認証で使用される中間計算値。" },
  { tag: "9F46", name: "ICC Public Key Certificate", format: "b", length: "var.", source: "ICC", description: "ICC自身の公開鍵証明書。" },
  { tag: "9F47", name: "ICC Public Key Exponent", format: "b", length: "1 or 3", source: "ICC", description: "ICC公開鍵の指数。" },
  { tag: "9F48", name: "ICC Public Key Remainder", format: "b", length: "var.", source: "ICC", description: "ICC公開鍵の剰余部分。" },
  { tag: "9F49", name: "Dynamic Data Authentication Data Object List (DDOL)", format: "b", length: "var.", source: "ICC", description: "DDAプロセスのInternal Authenで必要となるデータのリスト。" },
  { tag: "9F4A", name: "Static Data Authentication Tag List", format: "b", length: "var.", source: "ICC", description: "SDA/DDAでの署名対象に含めるべきタグのリスト。" },
  { tag: "9F4B", name: "Signed Dynamic Application Data", format: "b", length: "var.", source: "ICC", description: "DDAプロセスでカードが生成した署名データ。" },
  { tag: "9F4D", name: "Log Entry", format: "b", length: "2", source: "ICC", description: "トランザクションログの位置を特定する情報。" },
  { tag: "9F4E", name: "Merchant Name and Location", format: "ans", length: "var.", source: "Terminal", description: "加盟店の名前と所在地。" },
  { tag: "9F4F", name: "Log Format", format: "b", length: "var.", source: "ICC", description: "ログ1件分のデータ構造定義。" },

  // --- B & D Series: Special Templates & Error handling ---
  { tag: "BF0C", name: "File Control Information (FCI) Issuer Discretionary Data", format: "b", length: "var.", source: "ICC", description: "FCI内に含まれるイシュア独自のデータ領域。" },
  { tag: "DF8115", name: "Error Indication", format: "b", length: "6", source: "Terminal", description: "非接触決済Kernelでエラー発生時にセットされる詳細フラグ。" }
];
