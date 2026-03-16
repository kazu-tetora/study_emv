// EMV Glossary Data - Terms and Definitions
const GLOSSARY_DATA = [
  // --- A ---
  { term: "AAC", fullName: "Application Authentication Cryptogram", ja: "アプリケーション認証暗号文", definition: "トランザクション拒否時にICCが生成する暗号文。オフライン拒否を示す。", relatedSpecs: ["Book 3 Ch.9", "Book 2 Ch.8"], category: "cryptogram" },
  { term: "AC", fullName: "Application Cryptogram", ja: "アプリケーション暗号文", definition: "ICCが生成する暗号文の総称。TC、ARQC、AACの3種類がある。", relatedSpecs: ["Book 3 Ch.9"], category: "cryptogram" },
  { term: "ADF", fullName: "Application Definition File", ja: "アプリケーション定義ファイル", definition: "ICCのアプリケーションに関する情報を格納するファイル。AIDで参照される。", relatedSpecs: ["Book 1 Ch.10"], category: "file" },
  { term: "AEF", fullName: "Application Elementary File", ja: "アプリケーション基本ファイル", definition: "アプリケーションが使用するデータを格納するファイル。SFIで参照。", relatedSpecs: ["Book 1 Ch.10", "Book 3 Ch.5"], category: "file" },
  { term: "AFL", fullName: "Application File Locator", ja: "アプリケーションファイルロケータ", definition: "読み取るべきAEFレコードの位置情報。GPOレスポンスに含まれる。", relatedSpecs: ["Book 3 Ch.10", "Kernel 2 Ch.6"], category: "data" },
  { term: "AID", fullName: "Application Identifier", ja: "アプリケーション識別子", definition: "アプリケーションを一意に識別する5-16バイトの値。RID（5バイト）+ PIX（最大11バイト）で構成。", relatedSpecs: ["Book 1 Ch.12", "Book B Ch.5"], category: "identifier" },
  { term: "AIP", fullName: "Application Interchange Profile", ja: "アプリケーション交換プロファイル", definition: "カードがサポートする機能（SDA/DDA/CDA、CVM等）を示す2バイトのビットマップ。", relatedSpecs: ["Book 3 Annex C", "Kernel 2 Ch.4"], category: "data" },
  { term: "APDU", fullName: "Application Protocol Data Unit", ja: "アプリケーションプロトコルデータユニット", definition: "ICCとターミナル間の通信メッセージ単位。コマンドAPDUとレスポンスAPDUから構成。", relatedSpecs: ["Book 1 Ch.11", "Book 3 Ch.6"], category: "protocol" },
  { term: "ARC", fullName: "Authorisation Response Code", ja: "オーソリゼーション応答コード", definition: "イシュアからの承認/拒否を示す2バイトのコード。", relatedSpecs: ["Book 4 Annex A"], category: "data" },
  { term: "ARPC", fullName: "Authorisation Response Cryptogram", ja: "オーソリゼーション応答暗号文", definition: "イシュアが生成する認証暗号文。Method 1とMethod 2の2方式がある。", relatedSpecs: ["Book 2 Ch.8"], category: "cryptogram" },
  { term: "ARQC", fullName: "Authorisation Request Cryptogram", ja: "オーソリゼーション要求暗号文", definition: "オンライン承認要求時にICCが生成する暗号文。イシュアに送信される。", relatedSpecs: ["Book 3 Ch.9", "Book 2 Ch.8"], category: "cryptogram" },
  { term: "ATC", fullName: "Application Transaction Counter", ja: "アプリケーショントランザクションカウンタ", definition: "ICC上でトランザクション毎にインクリメントされるカウンタ。暗号文生成にも使用。", relatedSpecs: ["Book 3 Ch.10", "Kernel 2 Annex A"], category: "data" },
  { term: "ATR", fullName: "Answer To Reset", ja: "リセット応答", definition: "ICCがリセット信号に対して返す初期応答データ。通信パラメータを含む。", relatedSpecs: ["Book 1 Ch.3"], category: "protocol" },
  { term: "AUC", fullName: "Application Usage Control", ja: "アプリケーション使用制御", definition: "カードの使用条件（国内/海外、現金/商品等）を定義するビットマップ。", relatedSpecs: ["Book 3 Annex C", "Book 3 Ch.10"], category: "data" },

  // --- B ---
  { term: "BER-TLV", fullName: "Basic Encoding Rules - Tag Length Value", ja: "基本符号化規則 - タグ長さ値", definition: "データオブジェクトをTag-Length-Value形式でエンコードする標準規則。ISO/IEC 8825準拠。", relatedSpecs: ["Book 3 Annex B"], category: "encoding" },

  // --- C ---
  { term: "CA", fullName: "Certification Authority", ja: "認証局", definition: "公開鍵証明書を発行する信頼された第三者機関。EMVではPayment Systemが CA として機能。", relatedSpecs: ["Book 2 Ch.5", "Book 2 Ch.10"], category: "security" },
  { term: "CCC", fullName: "Compute Cryptographic Checksum", ja: "暗号チェックサム計算", definition: "Contactless Kernel 2で使用されるコマンド。Mag-stripeモードでDE暗号チェックサムを生成。", relatedSpecs: ["Kernel 2 Ch.5"], category: "command" },
  { term: "CDA", fullName: "Combined DDA/Application Cryptogram Generation", ja: "DDAとアプリケーション暗号文の結合生成", definition: "動的データ認証とアプリケーション暗号文の生成を1つのコマンドで行う方式。最も安全なオフライン認証方式。", relatedSpecs: ["Book 2 Ch.6", "Book 3 Ch.10"], category: "security" },
  { term: "CDOL", fullName: "Card Risk Management Data Object List", ja: "カードリスク管理データオブジェクトリスト", definition: "GENERATE ACコマンドで送信すべきデータ要素を指定するリスト。CDOL1（1st AC）とCDOL2（2nd AC）がある。", relatedSpecs: ["Book 3 Ch.9", "Kernel 2 Ch.4"], category: "data" },
  { term: "CID", fullName: "Cryptogram Information Data", ja: "暗号文情報データ", definition: "GENERATE ACレスポンスに含まれ、生成されたAC種別（TC/ARQC/AAC）やアドバイス要否を示す。", relatedSpecs: ["Book 3 Ch.9"], category: "data" },
  { term: "CVM", fullName: "Cardholder Verification Method", ja: "カード保有者認証方式", definition: "カード保有者の本人確認方式。オフラインPIN、オンラインPIN、署名、NoCVM、生体認証等がある。", relatedSpecs: ["Book 3 Ch.10", "Book 4 Ch.6", "Kernel 2 Ch.7"], category: "security" },
  { term: "CVR", fullName: "Card Verification Results", ja: "カード検証結果", definition: "CCD準拠アプリケーションにおけるカード検証処理の結果を示すバイト列。", relatedSpecs: ["Book 3 CCD"], category: "data" },

  // --- D ---
  { term: "DDA", fullName: "Dynamic Data Authentication", ja: "動的データ認証", definition: "ICCの秘密鍵を使用して動的署名を生成し検証するオフライン認証方式。リプレイ攻撃に耐性あり。", relatedSpecs: ["Book 2 Ch.6"], category: "security" },
  { term: "DDF", fullName: "Directory Definition File", ja: "ディレクトリ定義ファイル", definition: "複数のADFへのポインタを含むディレクトリファイル。PSEの一部。", relatedSpecs: ["Book 1 Ch.10"], category: "file" },
  { term: "DOL", fullName: "Data Object List", ja: "データオブジェクトリスト", definition: "特定のコマンドで必要なデータオブジェクトのタグとそのデータ長を指定するリスト。PDOL、CDOL、DDOL、TDOL等がある。", relatedSpecs: ["Book 3 Ch.5", "Kernel 2 Ch.4"], category: "data" },
  { term: "D-PAS", fullName: "Discover Payment Application Specification", ja: "Discover決済アプリケーション仕様", definition: "Discover非接触決済の技術仕様。Kernel 6で実装。", relatedSpecs: ["Kernel 6"], category: "brand" },

  // --- E ---
  { term: "ECC", fullName: "Elliptic Curve Cryptography", ja: "楕円曲線暗号", definition: "楕円曲線上の離散対数問題に基づく公開鍵暗号方式。RSAより短い鍵長で同等のセキュリティを実現。EMV v4.4で導入。", relatedSpecs: ["Book 2 Ch.12", "Book 2 Ch.13"], category: "security" },
  { term: "ECIES", fullName: "Elliptic Curve Integrated Encryption Scheme", ja: "楕円曲線統合暗号化スキーム", definition: "ECCを使用した公開鍵暗号化スキーム。鍵交換、対称暗号化、MACを統合。", relatedSpecs: ["Book 2 Annex A"], category: "security" },
  { term: "EMV", fullName: "Europay, Mastercard, Visa", ja: "EMV", definition: "チップカード決済の国際規格。Europay、Mastercard、Visaが共同で策定。現在はEMVCoが管理。", relatedSpecs: [], category: "general" },

  // --- F ---
  { term: "FCI", fullName: "File Control Information", ja: "ファイル制御情報", definition: "SELECTコマンドのレスポンスに含まれるファイル（ADF）の制御情報。AID、ラベル、優先度等を含む。", relatedSpecs: ["Book 1 Ch.11", "Book 3 Ch.6"], category: "data" },
  { term: "fDDA", fullName: "fast Dynamic Data Authentication", ja: "高速動的データ認証", definition: "Visa payWaveで使用される高速版DDA。GPOレスポンス内で署名検証を完了。", relatedSpecs: ["Kernel 3 Ch.3"], category: "security" },

  // --- G ---
  { term: "GAC", fullName: "Generate Application Cryptogram", ja: "アプリケーション暗号文生成（コマンド）", definition: "GENERATE ACコマンドの略。ICCにアプリケーション暗号文の生成を要求するAPDUコマンド。", relatedSpecs: ["Book 3 Ch.6", "Book 3 Ch.9"], category: "command" },
  { term: "GPO", fullName: "Get Processing Options", ja: "処理オプション取得", definition: "トランザクション処理の開始を指示するAPDUコマンド。PDOL指定のデータを送信し、AIPとAFLを取得。", relatedSpecs: ["Book 3 Ch.6", "Kernel 2 Ch.5"], category: "command" },

  // --- I ---
  { term: "IAD", fullName: "Issuer Application Data", ja: "イシュアアプリケーションデータ", definition: "イシュア固有のアプリケーションデータ。CVR等を含む。GENERATE ACレスポンスに含まれる。", relatedSpecs: ["Book 3 CCD", "Kernel 2 Annex A"], category: "data" },
  { term: "ICC", fullName: "Integrated Circuit Card", ja: "ICカード（チップカード）", definition: "集積回路（IC）を内蔵したカード。EMVチップカード決済の基盤となるスマートカード。", relatedSpecs: ["Book 1"], category: "general" },
  { term: "IDS", fullName: "Integrated Data Storage", ja: "統合データストレージ", definition: "Kernel 2のData Storage機能。ターミナルがカードにデータを保管・取得する仕組み。", relatedSpecs: ["Kernel 2 Ch.3"], category: "feature" },

  // --- K ---
  { term: "Kernel", fullName: "Kernel", ja: "カーネル", definition: "Contactless決済のブランド固有処理ロジック。Kernel 2(MC)、3(Visa)、4(Amex)、5(JCB)、6(Discover/UnionPay)、7等がある。", relatedSpecs: ["Book A", "Book B"], category: "general" },

  // --- M ---
  { term: "MAC", fullName: "Message Authentication Code", ja: "メッセージ認証コード", definition: "メッセージの完全性と認証を保証するための暗号ハッシュ値。DESまたはAESベース。", relatedSpecs: ["Book 2 Ch.9", "Book 2 Annex A"], category: "security" },

  // --- N ---
  { term: "NFC", fullName: "Near Field Communication", ja: "近距離無線通信", definition: "13.56MHzで動作する短距離無線通信技術。ISO 14443に基づくContactless決済の基盤技術。", relatedSpecs: ["Book A"], category: "protocol" },

  // --- O ---
  { term: "ODA", fullName: "Offline Data Authentication", ja: "オフラインデータ認証", definition: "オフライン環境でICCの正当性を検証する仕組みの総称。SDA、DDA、CDA、XDAが含まれる。", relatedSpecs: ["Book 2 Ch.5", "Book 2 Ch.6", "Book 3 Ch.10"], category: "security" },

  // --- P ---
  { term: "PAN", fullName: "Primary Account Number", ja: "プライマリアカウント番号", definition: "カード保有者のアカウントを識別する番号（カード番号）。最大19桁。", relatedSpecs: ["Book 3 Annex A", "Kernel 2 Annex A"], category: "data" },
  { term: "PDOL", fullName: "Processing Options Data Object List", ja: "処理オプションデータオブジェクトリスト", definition: "GPOコマンドで送信すべきターミナルデータを指定するリスト。FCI内でカードが指定。", relatedSpecs: ["Book 3 Ch.10", "Kernel 2 Ch.6"], category: "data" },
  { term: "PIN", fullName: "Personal Identification Number", ja: "暗証番号", definition: "カード保有者の本人確認に使用される数字コード。オフラインPIN（ICCで検証）とオンラインPIN（イシュアで検証）がある。", relatedSpecs: ["Book 2 Ch.7", "Book 3 Ch.10"], category: "security" },
  { term: "PIX", fullName: "Proprietary Application Identifier Extension", ja: "プロプライエタリアプリケーション識別子拡張", definition: "AIDのRID以降の部分。アプリケーションを詳細に識別する最大11バイト。", relatedSpecs: ["Book 1 Ch.12"], category: "identifier" },
  { term: "PPSE", fullName: "Proximity Payment System Environment", ja: "近接決済システム環境", definition: "Contactless決済でのアプリケーション選択に使用されるディレクトリ。'2PAY.SYS.DDF01' AIDでSELECT。", relatedSpecs: ["Book B Ch.5"], category: "contactless" },
  { term: "PSE", fullName: "Payment System Environment", ja: "決済システム環境", definition: "Contact決済でのアプリケーション選択に使用されるディレクトリ。'1PAY.SYS.DDF01' 名でSELECT。", relatedSpecs: ["Book 1 Ch.12"], category: "contact" },

  // --- Q ---
  { term: "qVSDC", fullName: "quick Visa Smart Debit Credit", ja: "クイックVSDC", definition: "Visa payWaveの高速処理モード。限定的なデータ読取りと高速暗号文生成で処理時間を短縮。", relatedSpecs: ["Kernel 3"], category: "brand" },

  // --- R ---
  { term: "RID", fullName: "Registered Application Provider Identifier", ja: "登録アプリケーションプロバイダ識別子", definition: "AIDの先頭5バイト。ISO/IEC 7816-5に従い登録される決済ブランドの識別子。", relatedSpecs: ["Book 1 Ch.12"], category: "identifier" },
  { term: "RSA", fullName: "Rivest-Shamir-Adleman", ja: "RSA暗号", definition: "大きな合成数の素因数分解の困難性に基づく公開鍵暗号方式。EMVの主要な非対称暗号アルゴリズム。", relatedSpecs: ["Book 2 Annex A", "Book 2 Annex B"], category: "security" },

  // --- S ---
  { term: "SDA", fullName: "Static Data Authentication", ja: "静的データ認証", definition: "イシュアの秘密鍵で署名された静的データをターミナルが検証するオフライン認証方式。カード偽造の検出が可能。", relatedSpecs: ["Book 2 Ch.5"], category: "security" },
  { term: "SFI", fullName: "Short File Identifier", ja: "短縮ファイル識別子", definition: "AEFを参照するための1-30の短い識別子。READ RECORDコマンドのパラメータとして使用。", relatedSpecs: ["Book 1 Ch.10", "Book 3 Ch.5"], category: "identifier" },

  // --- T ---
  { term: "TC", fullName: "Transaction Certificate", ja: "トランザクション証明書", definition: "トランザクション承認時にICCが生成するアプリケーション暗号文。オフライン承認またはオンライン承認後に発行。", relatedSpecs: ["Book 3 Ch.9", "Book 2 Ch.8"], category: "cryptogram" },
  { term: "TDOL", fullName: "Transaction Certificate Data Object List", ja: "トランザクション証明書データオブジェクトリスト", definition: "TCのハッシュ計算に使用するデータ要素を指定するリスト。", relatedSpecs: ["Book 3 Ch.9"], category: "data" },
  { term: "TLV", fullName: "Tag-Length-Value", ja: "タグ・長さ・値", definition: "データ構造化のエンコーディング形式。Tag（データ種別）、Length（データ長）、Value（データ値）で構成。", relatedSpecs: ["Book 3 Annex B", "Kernel 2 Ch.4"], category: "encoding" },
  { term: "TSI", fullName: "Transaction Status Information", ja: "トランザクション状態情報", definition: "トランザクション処理中に実行された機能（ODA、CVM、ターミナルリスク管理等）を示すビットマップ。", relatedSpecs: ["Book 3 Annex C"], category: "data" },
  { term: "TVR", fullName: "Terminal Verification Results", ja: "ターミナル検証結果", definition: "ターミナルの各種検証・リスク管理の結果を示す5バイトのビットマップ。オフライン/オンライン判定に使用。", relatedSpecs: ["Book 3 Annex C", "Book 3 Ch.10"], category: "data" },

  // --- V ---
  { term: "VSDC", fullName: "Visa Smart Debit Credit", ja: "VSDC", definition: "Visaのチップカード決済アプリケーション。Contact/Contactless両方で使用。", relatedSpecs: ["Kernel 3"], category: "brand" },

  // --- X ---
  { term: "XDA", fullName: "ECC-based Dynamic Data Authentication", ja: "ECC動的データ認証", definition: "楕円曲線暗号（ECC）を使用した動的データ認証。RSA-DDAのECC版。EMV v4.4で導入。", relatedSpecs: ["Book 2 Ch.12"], category: "security" }
];

// Category labels for display
const GLOSSARY_CATEGORIES = {
  cryptogram: { label: "暗号文", color: "#e74c3c" },
  security: { label: "セキュリティ", color: "#9b59b6" },
  command: { label: "コマンド", color: "#3498db" },
  data: { label: "データ要素", color: "#2ecc71" },
  file: { label: "ファイル", color: "#f39c12" },
  protocol: { label: "プロトコル", color: "#1abc9c" },
  identifier: { label: "識別子", color: "#e67e22" },
  encoding: { label: "エンコーディング", color: "#95a5a6" },
  general: { label: "一般", color: "#34495e" },
  brand: { label: "ブランド", color: "#d35400" },
  feature: { label: "機能", color: "#16a085" },
  contact: { label: "接触型", color: "#2980b9" },
  contactless: { label: "非接触型", color: "#8e44ad" }
};
