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
  { tag: "4F", name: "Application Identifier (AID)", format: "b", length: "5-16", source: "ICC", description: "アプリケーションを一意に識別する識別子。RID (5 bytes) と PIX (最大11 bytes) で構成される。" },
  { tag: "50", name: "Application Label", format: "ans", length: "1-16", source: "ICC", description: "カード保有者に表示するためのアプリケーションの名称。" },
  { tag: "57", name: "Track 2 Equivalent Data", format: "cn", length: "var. up to 19", source: "ICC", description: "磁気ストライプのトラック2と同等のデータ内容。PANと有効期限を含む。" },
  { tag: "5A", name: "Application Primary Account Number (PAN)", format: "cn", length: "var. up to 10", source: "ICC", description: "カード保有者のプライマリアカウント番号（クレジットカード番号等）。" },
  { tag: "82", name: "Application Interchange Profile (AIP)", format: "b", length: "2", source: "ICC", description: "カードがサポートする機能（SDA, DDA, CDA, ターミナルリスク管理等）を示す2バイトのリスト。" },
  { tag: "84", name: "Dedicated File (DF) Name", format: "b", length: "5-16", source: "ICC", description: "アプリケーションのファイル名（通常はAIDと同じ）。" },
  { tag: "8E", name: "Card Risk Management Data Object List 1 (CDOL1)", format: "b", length: "var.", source: "ICC", description: "1回目のGENERATE ACコマンドでターミナルがカードに渡す必要があるデータ要素のリストとフォーマットを指定。" },
  { tag: "8F", name: "Card Authority Public Key Index", format: "b", length: "1", source: "ICC", description: "オフラインデータ認証時に使用するCA公開鍵のインデックス。" },
  { tag: "95", name: "Terminal Verification Results (TVR)", format: "b", length: "5", source: "Terminal", description: "ターミナルが行った各種チェック（オフラインデータ認証、リスク管理、CVM等）の結果を示す5バイトのフラグ。トランザクションの承認/拒否の判断材料。" },
  { tag: "9A", name: "Transaction Date", format: "n 6 (YYMMDD)", length: "3", source: "Terminal", description: "ターミナルでトランザクションが発生したローカル日付。" },
  { tag: "9C", name: "Transaction Type", format: "n 2", length: "1", source: "Terminal", description: "金融トランザクションのタイプ（購買、キャッシング、返金などのISO 8583処理コードに基づく）。" },
  { tag: "9F02", name: "Amount, Authorised (Numeric)", format: "n 12", length: "6", source: "Terminal", description: "トランザクションの承認金額（小数点を除いた金額）。" },
  { tag: "9F03", name: "Amount, Other (Numeric)", format: "n 12", length: "6", source: "Terminal", description: "キャッシュバックなどの追加金額。" },
  { tag: "9F06", name: "Application Identifier (AID) - terminal", format: "b", length: "5-16", source: "Terminal", description: "ターミナルによって使用されるアプリケーションの識別子。" },
  { tag: "9F09", name: "Application Version Number", format: "b", length: "2", source: "Terminal", description: "ターミナルがサポートするEMVアプリケーションのバージョンバージョン。" },
  { tag: "9F10", name: "Issuer Application Data (IAD)", format: "b", length: "var. up to 32", source: "ICC", description: "イシュア（カード発行者）に送信するためのプロプライエタリなアプリケーションデータ（CVNやDERなどを含む）。" },
  { tag: "9F1A", name: "Terminal Country Code", format: "n 3", length: "2", source: "Terminal", description: "ターミナルの設置国のコード（ISO 3166準拠）。" },
  { tag: "9F26", name: "Application Cryptogram", format: "b", length: "8", source: "ICC", description: "GENERATE ACコマンドによってカードから返される暗号文（TC, ARQC, または AAC）。" },
  { tag: "9F27", name: "Cryptogram Information Data (CID)", format: "b", length: "1", source: "ICC", description: "返された暗号文の種類（TC/ARQC/AAC）およびその他の情報を示すバイトデータ。" },
  { tag: "9F33", name: "Terminal Capabilities", format: "b", length: "3", source: "Terminal", description: "ターミナルのカード入力能力、CVM能力、およびセキュリティ能力を示す3バイトの値。" },
  { tag: "9F34", name: "Cardholder Verification Method (CVM) Results", format: "b", length: "3", source: "Terminal", description: "トランザクションで行われたCVMの結果（使用されたメソッド、成功/失敗等）。" },
  { tag: "9F36", name: "Application Transaction Counter (ATC)", format: "b", length: "2", source: "ICC", description: "カードのトランザクション実行回数を示すカウンター。取引の順序付けに使用。" },
  { tag: "9F37", name: "Unpredictable Number", format: "b", length: "4", source: "Terminal", description: "ターミナルが生成する4バイトの乱数。暗号文生成時のランダム性を確保するために使用。" },
  { tag: "9F38", name: "Processing Options Data Object List (PDOL)", format: "b", length: "var.", source: "ICC", description: "GET PROCESSING OPTIONSコマンドで要求されるターミナルデータのリスト。" },
  { tag: "9F4E", name: "Merchant Name and Location", format: "ans", length: "var.", source: "Terminal", description: "加盟店の名前と場所の文字列。" },
  { tag: "5F20", name: "Cardholder Name", format: "ans", length: "2-26", source: "ICC", description: "カード保有者の氏名（ローマ字表記）。" },
  { tag: "5F24", name: "Application Expiration Date", format: "n 6 (YYMMDD)", length: "3", source: "ICC", description: "アプリケーション（カード）の有効期限。" },
  { tag: "5F25", name: "Application Effective Date", format: "n 6 (YYMMDD)", length: "3", source: "ICC", description: "アプリケーション（カード）が有効になる開始日付。" },
  { tag: "5F28", name: "Issuer Country Code", format: "n 3", length: "2", source: "ICC", description: "カード発行国のISO 3166国番号。" },
  { tag: "5F2A", name: "Transaction Currency Code", format: "n 3", length: "2", source: "Terminal", description: "トランザクション通貨のISO 4217コード（例: 0392 = 日本円）。" },
  { tag: "5F2D", name: "Language Preference", format: "an 2", length: "2-8", source: "ICC", description: "カード保有者が優先する言語コード（ISO 639準拠）。" },
  { tag: "5F30", name: "Service Code", format: "n 3", length: "2", source: "ICC", description: "磁気ストライプのサービスコードに相当する値。" },
  { tag: "5F34", name: "Application PAN Sequence Number", format: "n 2", length: "1", source: "ICC", description: "同じPANを持つ複数のカード（家族カード等）を区別するための番号。" },
  { tag: "6F", name: "FCI Template", format: "b", length: "var.", source: "ICC", description: "File Control Information (FCI) のデータを含むBER-TLV構造のテンプレート。" },
  { tag: "84", name: "Dedicated File (DF) Name", format: "b", length: "5-16", source: "ICC", description: "アプリケーションのファイル名（通常はAIDと同じ）。" },
  { tag: "87", name: "Application Priority Indicator", format: "b", length: "1", source: "ICC", description: "同一ディレクトリ内でのアプリケーションの優先順位。" },
  { tag: "88", name: "Short File Identifier (SFI)", format: "b", length: "1", source: "ICC", description: "アプリケーション内のファイルを指定するための短い識別子（1~30）。" },
  { tag: "8A", name: "Authorization Response Code (ARC)", format: "an 2", length: "2", source: "Terminal/Host", description: "ホストまたはターミナルによる承認結果コード（例: '00' = 承認）。" },
  { tag: "91", name: "Issuer Authentication Data", format: "b", length: "8-16", source: "Host", description: "イシュア認証に使用するデータ（ARPC等）。" },
  { tag: "94", name: "Application File Locator (AFL)", format: "b", length: "var. (4の倍数)", source: "ICC", description: "トランザクション中に読み取る必要があるEFファイルの範囲（SFI, 開始レコード, 終了レコード等）を指定。" },
  { tag: "9F07", name: "Application Usage Control (AUC)", format: "b", length: "2", source: "ICC", description: "カードが国内外でどのような取引（ATM, POS等）を許可するかを示す制限フラグ。" },
  { tag: "9F08", name: "Application Version Number (ICC)", format: "b", length: "2", source: "ICC", description: "カード側が保持するEMVアプリケーションのバージョン番号。" },
  { tag: "9F0D", name: "Issuer Action Code - Default", format: "b", length: "5", source: "ICC", description: "オンライン接続できない場合に、ターミナルがオフラインで拒否するかどうかを判断するためのアクションコード。" },
  { tag: "9F0E", name: "Issuer Action Code - Denial", format: "b", length: "5", source: "ICC", description: "オフラインで即座に取引を拒否するかどうかを判断するためのアクションコード。" },
  { tag: "9F0F", name: "Issuer Action Code - Online", format: "b", length: "5", source: "ICC", description: "オンライン不可の場合に取引を拒否するかを判断するためのアクションコード。" },
  { tag: "9F12", name: "Application Preferred Name", format: "ans", length: "1-16", source: "ICC", description: "カード保有者に表示する際に優先されるアプリケーション名（UTF-8エンコード可能）。" },
  { tag: "9F21", name: "Transaction Time", format: "n 6 (HHMMSS)", length: "3", source: "Terminal", description: "トランザクションが発生したローカル時刻。" },
  { tag: "9F35", name: "Terminal Type", format: "n 2", length: "1", source: "Terminal", description: "ターミナルの種類（有人POS、無人ATM、金融機関用等）。" },
  { tag: "9F39", name: "POS Entry Mode", format: "n 2", length: "1", source: "Terminal", description: "カード情報の入力方法（IC, 非接触, 磁気, 非入力等）。" },
  { tag: "9F41", name: "Transaction Sequence Counter", format: "n 4-8", length: "2-4", source: "Terminal", description: "ターミナルが取引ごとにインクリメントする一連番号。" },
  { tag: "9F66", name: "Terminal Transaction Qualifiers (TTQ)", format: "b", length: "4", source: "Terminal", description: "非接触決済においてターミナルがサポートする機能や要件（MSD/qVSDCサポート等）を示すフラグ。" },
  { tag: "9F6E", name: "Form Factor Indicator", format: "b", length: "4", source: "ICC", description: "デバイスの形状（モバイル、時計、ステッカー等）を示すインジケーター。" }
];
