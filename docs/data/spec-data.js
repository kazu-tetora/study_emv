// EMV Specification Data - Chapter structure and summaries
const SPEC_DATA = {
  contact: {
    label: "Contact (EMV v4.4)",
    description: "ICCとターミナル間の接触型インターフェースに関する仕様。ISO/IEC 7816準拠のチップカード決済の基盤規格。",
    books: [
      {
        id: "book1",
        title: "Book 1: ICC to Terminal Interface",
        filename: "EMV_v4.4_Book_1_ICC_to_Terminal_Interface.pdf",
        pages: 81,
        description: "ICCとターミナル間の物理的・論理的インターフェースを定義。ファイル構造、コマンド、アプリケーション選択手順を規定する基盤仕様書。",
        chapters: [
          {
            number: "1",
            title: "Scope",
            summary: "仕様書の適用範囲、バージョン4.4での変更点、構成、基盤規格、対象読者について記述。",
            keywords: ["scope", "version", "ISO 7816", "structure"]
          },
          {
            number: "2",
            title: "Normative References",
            summary: "準拠すべき規格文書（ISO/IEC 7816シリーズ等）の一覧と参照先を定義。",
            keywords: ["ISO", "IEC", "reference", "standard"]
          },
          {
            number: "3",
            title: "Definitions",
            summary: "仕様書全体で使用される用語の定義。AID、ADF、ATR、ICC、PSE等の主要概念を説明。",
            keywords: ["definition", "terminology", "AID", "ADF", "ATR", "ICC", "PSE"]
          },
          {
            number: "4",
            title: "Abbreviations, Notations, Conventions, and Terminology",
            summary: "略語一覧（AID, APDU, ATR等）、表記法、データ要素のフォーマット規則、用語体系を規定。",
            keywords: ["abbreviation", "notation", "convention", "APDU", "ATR", "format"]
          },
          {
            number: "10",
            title: "Files",
            summary: "ICCのファイル構造を定義。ADF（アプリケーション定義ファイル）、AEF（アプリケーション基本ファイル）、PSEディレクトリ構造、SFIによる参照方式を規定。",
            keywords: ["file structure", "ADF", "AEF", "PSE", "SFI", "directory", "ISO 7816-4"]
          },
          {
            number: "11",
            title: "Commands",
            summary: "APDUメッセージ構造（コマンド/レスポンス）、READ RECORDコマンド、SELECTコマンドの詳細仕様。FCI（File Control Information）の構造も定義。",
            keywords: ["APDU", "command", "response", "READ RECORD", "SELECT", "FCI", "message structure"]
          },
          {
            number: "12",
            title: "Application Selection",
            summary: "カード上のアプリケーション選択手順を規定。PSEを使った方法、AIDリストを使った方法、候補リスト構築、最終選択のフロー。マルチアプリケーションカード対応。",
            keywords: ["application selection", "PSE", "AID", "candidate list", "final selection", "multi-application"]
          },
          {
            number: "Annex B",
            title: "Data Elements Table",
            summary: "データ要素の名前順・タグ順の一覧表。各データ要素の名称、タグ値、長さ、ソースを定義。",
            keywords: ["data element", "tag", "TLV", "table"]
          },
          {
            number: "Annex C",
            title: "Examples of Directory Structures",
            summary: "シングルアプリケーション、シングルレベルディレクトリ、マルチレベルディレクトリの具体的な構造例。",
            keywords: ["directory", "example", "single application", "multi-level"]
          }
        ]
      },
      {
        id: "book2",
        title: "Book 2: Security and Key Management",
        filename: "EMV_v4.4_Book_2_Security_and_Key_Management.pdf",
        pages: 192,
        description: "オフラインデータ認証（SDA, DDA, CDA）、PIN暗号化、アプリケーション暗号文生成、鍵管理の仕様。RSAおよびECCベースのセキュリティメカニズム。",
        chapters: [
          {
            number: "5",
            title: "Static Data Authentication (SDA)",
            summary: "静的データ認証の仕組み。CA公開鍵の取得、イシュア公開鍵の復元・検証、署名済み静的アプリケーションデータの検証フローを定義。",
            keywords: ["SDA", "static data authentication", "CA public key", "issuer public key", "certificate", "digital signature"]
          },
          {
            number: "6",
            title: "Offline Dynamic Data Authentication (DDA, CDA)",
            summary: "動的データ認証（DDA）およびCDA（Combined DDA/AC生成）の仕様。ICC公開鍵の取得、動的署名の生成と検証、CDAフローを詳細に規定。",
            keywords: ["DDA", "CDA", "dynamic data authentication", "ICC public key", "dynamic signature", "combined"]
          },
          {
            number: "7",
            title: "PIN and Biometric Data Encipherment Using RSA",
            summary: "RSAを使用したオフラインPIN暗号化と検証、バイオメトリクスデータの暗号化・復号の仕様。ICC公開鍵を使用した暗号化スキーム。",
            keywords: ["PIN", "RSA", "encipherment", "biometric", "offline PIN", "encryption"]
          },
          {
            number: "8",
            title: "Application Cryptogram and Issuer Authentication",
            summary: "アプリケーション暗号文（TC/ARQC/AAC）の生成アルゴリズム、イシュア認証（ARPC Method 1/2）、鍵管理方式を定義。",
            keywords: ["application cryptogram", "TC", "ARQC", "AAC", "ARPC", "issuer authentication", "MAC"]
          },
          {
            number: "9",
            title: "Secure Messaging",
            summary: "セキュアメッセージングのフォーマット、完全性・認証のためのMAC計算、機密性のための暗号化、セッション鍵導出方式を規定。",
            keywords: ["secure messaging", "MAC", "session key", "integrity", "confidentiality", "encryption"]
          },
          {
            number: "10",
            title: "CA Public Key Management Principles and Policies",
            summary: "認証局（CA）公開鍵の管理原則とポリシー。鍵のライフサイクル管理に関する基本方針。",
            keywords: ["CA", "certificate authority", "public key management", "policy"]
          },
          {
            number: "11",
            title: "Terminal Security and Key Management Requirements",
            summary: "ターミナルのセキュリティ要件。PINパッドのセキュリティ、CA公開鍵の導入・保管・撤回手順、乱数生成要件を規定。",
            keywords: ["terminal security", "PIN pad", "key management", "unpredictable number"]
          },
          {
            number: "12",
            title: "Offline Dynamic Data Authentication Using ECC (XDA)",
            summary: "楕円曲線暗号（ECC）を使用した動的データ認証（XDA）の仕様。ECC鍵・証明書の構造、署名生成・検証フローを定義。",
            keywords: ["ECC", "XDA", "elliptic curve", "P-256", "P-521", "digital signature"]
          },
          {
            number: "13",
            title: "Offline Data Encipherment Using ECC",
            summary: "ECCを使用したPIN暗号化・復号、バイオメトリクスデータの暗号化・復号の仕様。ECIES暗号化スキーム。",
            keywords: ["ECC", "PIN encipherment", "ECIES", "biometric", "encryption", "decryption"]
          },
          {
            number: "Annex A",
            title: "Security Mechanisms",
            summary: "対称鍵メカニズム（DES/AES暗号化、MAC計算、セッション鍵導出、マスター鍵導出）および非対称鍵メカニズム（RSA/ECC署名、ECC暗号化）の詳細アルゴリズム。",
            keywords: ["DES", "AES", "MAC", "RSA", "ECC", "session key", "master key", "algorithm"]
          },
          {
            number: "Annex B",
            title: "Approved Cryptographic Algorithms",
            summary: "承認された暗号アルゴリズム一覧。DES/AES（対称）、RSA/ECC（非対称）、SHA-1/SHA-256（ハッシュ）の仕様と楕円曲線パラメータ（P-256, P-521）。",
            keywords: ["DES", "AES", "RSA", "ECC", "SHA-1", "SHA-256", "P-256", "P-521", "hash"]
          }
        ]
      },
      {
        id: "book3",
        title: "Book 3: Application Specification",
        filename: "EMV_v4.4_Book_3_Application_Specification.pdf",
        pages: 230,
        description: "EMV決済トランザクションのアプリケーション仕様。データ要素、コマンド、トランザクションフロー、CVM処理、リスク管理等を包括的に規定。",
        chapters: [
          {
            number: "5",
            title: "Data Elements and Files",
            summary: "金融取引に関連するデータ要素、データオブジェクト（TLV形式）の分類、ファイル参照方式、DOL（Data Object List）の使用規則を定義。",
            keywords: ["data element", "data object", "TLV", "DOL", "AEF", "SFI", "BER-TLV"]
          },
          {
            number: "6",
            title: "Commands for Financial Transaction",
            summary: "金融取引用コマンドAPDU一式：APPLICATION BLOCK/UNBLOCK, CARD BLOCK, EXTERNAL AUTHENTICATE, GENERATE AC, GET CHALLENGE/DATA/PROCESSING OPTIONS, INTERNAL AUTHENTICATE, PIN CHANGE, READ RECORD, VERIFY。各コマンドの詳細フォーマットとステータスコード。",
            keywords: ["APDU", "GENERATE AC", "GET PROCESSING OPTIONS", "EXTERNAL AUTHENTICATE", "INTERNAL AUTHENTICATE", "VERIFY", "PIN", "READ RECORD", "SELECT", "GET DATA"]
          },
          {
            number: "7",
            title: "Files for Financial Transaction Interchange",
            summary: "データオブジェクトのマッピング規則、必須データオブジェクト一覧、GET DATAおよびGPOで取得可能なデータ、ICC内のエラー/欠損データの処理方法。",
            keywords: ["data mapping", "mandatory data", "GET DATA", "GPO", "error handling"]
          },
          {
            number: "8",
            title: "Transaction Flow",
            summary: "EMVトランザクション全体のフローチャート。例外処理、追加機能との関係を含む処理の全体像を定義。",
            keywords: ["transaction flow", "flowchart", "exception handling"]
          },
          {
            number: "9",
            title: "GENERATE AC Command Coding",
            summary: "GENERATE ACコマンドの詳細コーディング。コマンドパラメータ、カードリスク管理データ、トランザクション証明書データ、1st/2nd発行の使い分け。",
            keywords: ["GENERATE AC", "TC", "ARQC", "AAC", "cryptogram", "card risk management"]
          },
          {
            number: "10",
            title: "Functions Used in Transaction Processing",
            summary: "トランザクション処理の各機能：アプリケーション処理開始、アプリケーションデータ読取り、オフラインデータ認証、処理制限、カード保有者認証（CVM）、ターミナルリスク管理、ターミナル/カードアクション分析、オンライン処理、イシュアスクリプト処理、完了処理。EMVトランザクションの中核。",
            keywords: ["initiate application processing", "read application data", "offline data authentication", "processing restrictions", "CVM", "cardholder verification", "terminal risk management", "terminal action analysis", "card action analysis", "online processing", "issuer script", "floor limit", "velocity checking", "PIN", "signature", "biometric"]
          },
          {
            number: "Annex A",
            title: "Data Elements Dictionary",
            summary: "全データ要素の辞書。名前順とタグ順の両方で一覧化。各要素の名称、タグ、長さ、フォーマット、ソース（ICC/Terminal）を定義。",
            keywords: ["data element", "dictionary", "tag", "format", "source"]
          },
          {
            number: "Annex B",
            title: "Rules for BER-TLV Data Objects",
            summary: "BER-TLV（Basic Encoding Rules - Tag Length Value）データオブジェクトのコーディング規則。タグフィールド、長さフィールド、値フィールドのエンコーディング詳細。",
            keywords: ["BER-TLV", "tag", "length", "value", "encoding", "data object"]
          },
          {
            number: "Annex C",
            title: "Coding of Data Elements Used in Transaction Processing",
            summary: "トランザクション処理で使用されるデータ要素のビットレベル定義：AIP、Application Usage Control、CVM Rule、TVR（Terminal Verification Results）、TSI、BIT（Biometric Information Template）。",
            keywords: ["AIP", "AUC", "CVM", "TVR", "TSI", "bit coding", "biometric"]
          }
        ]
      },
      {
        id: "book4",
        title: "Book 4: Other Interfaces",
        filename: "EMV_v4.4_Book_4_Other_Interfaces.pdf",
        pages: 133,
        description: "ターミナルの物理特性、ソフトウェアアーキテクチャ、カード保有者/アテンダントインターフェース、アクワイアラインターフェースを規定。",
        chapters: [
          {
            number: "5",
            title: "Terminal Types and Capabilities",
            summary: "ターミナルの種類（有人ATM、無人端末等）の分類、ターミナル能力（カード入力/CVM/セキュリティ能力）、端末構成パターンの定義。",
            keywords: ["terminal type", "terminal capability", "ATM", "POS", "attended", "unattended"]
          },
          {
            number: "6",
            title: "Functional Requirements",
            summary: "ターミナルの機能要件全般。オフラインデータ認証（CDA/XDA）、処理制限、CVM処理、ターミナルリスク管理、オンライン処理、スクリプト処理、金額入力、音声照会、カード読取り等の要件を詳細に規定。",
            keywords: ["functional requirements", "CDA", "XDA", "CVM", "risk management", "online processing", "script", "card reading", "voice referral"]
          },
          {
            number: "7",
            title: "Physical Characteristics",
            summary: "ターミナルの物理的特性。キーパッド（コマンドキー、PINパッド）、ディスプレイ、メモリ保護、時計、レシートプリンタ、磁気ストライプリーダーの要件。",
            keywords: ["keypad", "PIN pad", "display", "printer", "magnetic stripe reader", "physical"]
          },
          {
            number: "8",
            title: "Terminal Software Architecture",
            summary: "ターミナルソフトウェアアーキテクチャ。環境変更への対応、アプリケーションライブラリ、API、インタプリタ（仮想マシン/カーネル）、プラグ&ソケットアーキテクチャ。",
            keywords: ["software architecture", "API", "kernel", "virtual machine", "interpreter", "plug and socket"]
          },
          {
            number: "9",
            title: "Software Management",
            summary: "ターミナルソフトウェアの管理要件。ソフトウェアの更新・配布に関する基本方針。",
            keywords: ["software management", "update", "distribution"]
          },
          {
            number: "10",
            title: "Data Management",
            summary: "ターミナルのデータ管理。アプリケーション非依存データ（端末/取引関連）とアプリケーション依存データの管理方法。",
            keywords: ["data management", "terminal data", "transaction data", "application data"]
          },
          {
            number: "11",
            title: "Cardholder and Attendant Interface",
            summary: "カード保有者およびアテンダントとのインターフェース。言語選択、標準メッセージ一覧、アプリケーション選択画面、レシート出力の要件。",
            keywords: ["cardholder interface", "language selection", "standard message", "receipt"]
          },
          {
            number: "12",
            title: "Acquirer Interface",
            summary: "アクワイアラとのインターフェース。オーソリゼーション要求/応答、金融取引要求/応答/確認、バッチデータキャプチャ、精算、オンラインアドバイス、リバーサルのメッセージ内容と例外処理。",
            keywords: ["acquirer", "authorization", "financial transaction", "batch", "reconciliation", "advice", "reversal", "online"]
          },
          {
            number: "Annex A",
            title: "Coding of Terminal Data Elements",
            summary: "ターミナルデータ要素のコーディング。Terminal Type、Terminal Capabilities、Additional Terminal Capabilities、CVM Results、Issuer Script Results、ARC、Biometric Terminal Capabilitiesのビットレベル定義。",
            keywords: ["terminal type", "terminal capabilities", "CVM results", "ARC", "coding"]
          }
        ]
      }
    ]
  },
  contactless: {
    label: "Contactless (EMV v2.11)",
    description: "NFCベースの非接触型決済インターフェース仕様。Entry Point仕様とブランド別Kernel仕様で構成。",
    books: [
      {
        id: "bookA",
        title: "Book A: Architecture and General Requirements",
        filename: "EMV-Contactless-Book-A-Architecture-and-General-Rqmts-v2.11.pdf",
        pages: null,
        description: "EMV Contactlessの全体アーキテクチャと一般要件。非接触決済システムの基本構造、用語、要件を定義する上位仕様書。",
        chapters: [
          {
            number: "1",
            title: "Introduction",
            summary: "EMV Contactless仕様書群の概要と目的。非接触型決済の基本概念とアーキテクチャの全体像。",
            keywords: ["introduction", "overview", "contactless", "NFC", "architecture"]
          },
          {
            number: "2",
            title: "Architecture Overview",
            summary: "非接触決済システムのアーキテクチャ概要。Entry PointとKernelの関係、トランザクションフローの基本構造。",
            keywords: ["architecture", "entry point", "kernel", "transaction flow"]
          },
          {
            number: "3",
            title: "General Requirements",
            summary: "全Kernelに共通する一般要件。通信プロトコル、タイミング要件、エラー処理の基本方針。",
            keywords: ["general requirements", "protocol", "timing", "error handling", "ISO 14443"]
          }
        ]
      },
      {
        id: "bookB",
        title: "Book B: Entry Point Specification",
        filename: "EMV-Contactless-Book-B-Entry-Point-Specification-v2.11.pdf",
        pages: null,
        description: "非接触型決済のEntry Point仕様。カード検出からKernel起動までの前処理フローを規定。",
        chapters: [
          {
            number: "1",
            title: "Introduction",
            summary: "Entry Point仕様書の目的と適用範囲。Entry Pointの役割と基本概念。",
            keywords: ["entry point", "introduction", "scope"]
          },
          {
            number: "2",
            title: "Entry Point Architecture",
            summary: "Entry Pointのアーキテクチャ。Polling、Pre-processing、Protocol Activation、Combination Selection、Kernel Activationの各フェーズ。",
            keywords: ["polling", "pre-processing", "protocol activation", "combination selection", "kernel activation"]
          },
          {
            number: "3",
            title: "Pre-Processing",
            summary: "前処理フロー。ターミナル設定の読み込み、サポートされるアプリケーションの特定、Status Check。",
            keywords: ["pre-processing", "terminal configuration", "status check"]
          },
          {
            number: "4",
            title: "Protocol Activation",
            summary: "ISO 14443に基づくプロトコルアクティベーション。Type A/Type Bカードの検出と活性化手順。",
            keywords: ["protocol activation", "ISO 14443", "Type A", "Type B", "collision detection"]
          },
          {
            number: "5",
            title: "Combination Selection",
            summary: "アプリケーション選択とKernel特定の手順。PPSEの使用、AID照合、Kernelの決定フロー。",
            keywords: ["combination selection", "PPSE", "AID", "kernel selection"]
          }
        ]
      },
      {
        id: "kernel2",
        title: "Kernel 2 (Mastercard)",
        filename: "C-2-Kernel-2-V2.11-Final-June-2023-1.pdf",
        pages: 458,
        description: "Mastercard非接触決済用Kernel仕様。Mag-stripeモードとEMVモードの両方をサポート。状態遷移マシンベースの詳細な処理仕様。",
        chapters: [
          {
            number: "1",
            title: "Using This Manual",
            summary: "使用方法、目的、対象読者、関連文書、用語定義、表記法（状態遷移マシン、データオブジェクト記法等）。",
            keywords: ["manual", "purpose", "audience", "terminology", "notation", "state machine"]
          },
          {
            number: "2",
            title: "General Architecture",
            summary: "リーダープロセスアーキテクチャ。P（Polling）、D（Protocol Activation）、S（Combination Selection）、K（Kernel）、M（Management）の各プロセスとリーダーデータベース。",
            keywords: ["architecture", "process P", "process D", "process S", "process K", "process M", "reader database"]
          },
          {
            number: "3",
            title: "Reader Process K — Kernel Processing",
            summary: "Kernel処理の中核仕様。Mag-stripeモードとEMVモードの切替え、データ交換、Data Storage（IDS）、モバイルトランザクション、Relay Resistance Protocol、CDAなしの最適化。",
            keywords: ["kernel processing", "mag-stripe", "EMV mode", "data exchange", "data storage", "IDS", "mobile", "relay resistance", "CDA"]
          },
          {
            number: "4",
            title: "Data Organization",
            summary: "TLVデータベースの構造とアクセス制御、DOLハンドリング、ワーキング変数、リスト処理、構成データ、Outcome Parameter Set、Data Record/Discretionary Dataのフォーマット。",
            keywords: ["TLV database", "DOL", "configuration", "outcome parameter", "data record", "discretionary data"]
          },
          {
            number: "5",
            title: "C-APDU Commands",
            summary: "Contactless用APDUコマンド定義：Compute Cryptographic Checksum、Exchange Relay Resistance Data、Generate AC、Get Data、Get Processing Options、Put Data、Read Record。",
            keywords: ["APDU", "CCC", "relay resistance", "generate AC", "GPO", "get data", "put data", "read record"]
          },
          {
            number: "6",
            title: "Kernel State Machine",
            summary: "カーネルの状態遷移マシン。全15+状態：Idle、Waiting for PDOL Data、GPO Response、Read Record Response、Get Data Response、Write Flag、Generate AC Response、CCC Response等。各状態のフロー図と詳細な処理ロジック。",
            keywords: ["state machine", "idle", "PDOL", "GPO", "read record", "generate AC", "CCC", "flow diagram"]
          },
          {
            number: "7",
            title: "Procedures",
            summary: "共通手続き：CVM Selection（カード保有者認証方式選択）、Prepare Generate AC Command、Processing Restrictions、Terminal Action Analysis。各手続きのフロー図と処理ステップ。",
            keywords: ["CVM selection", "generate AC", "processing restrictions", "terminal action analysis", "procedure"]
          },
          {
            number: "8",
            title: "Security Algorithms",
            summary: "セキュリティアルゴリズム：乱数生成（Unpredictable Number）、OWHF2、OWHF2AES（One-Way Hash Functions）。",
            keywords: ["security", "unpredictable number", "OWHF2", "AES", "hash"]
          },
          {
            number: "Annex A",
            title: "Data Dictionary",
            summary: "全データオブジェクトの辞書。200以上のデータ要素とその名称、タグ、長さ、フォーマット、アクセス条件を定義。",
            keywords: ["data dictionary", "data object", "tag", "format"]
          }
        ]
      },
      {
        id: "kernel3",
        title: "Kernel 3 (Visa)",
        filename: "C-3-Kernel-3-v2.11-June-2023.pdf",
        pages: null,
        description: "Visa非接触決済（payWave）用Kernel仕様。qVSDCおよびVSDCモードに対応した処理フローを定義。",
        chapters: [
          {
            number: "1",
            title: "Introduction",
            summary: "Kernel 3の目的と適用範囲。Visa payWave仕様の概要とqVSDC/VSDCの基本概念。",
            keywords: ["visa", "payWave", "qVSDC", "VSDC", "introduction"]
          },
          {
            number: "2",
            title: "Architecture",
            summary: "Kernel 3のアーキテクチャ。qVSDCモード（Quick VSDC）とフルVSDCモードの構成と処理フロー概要。",
            keywords: ["architecture", "qVSDC", "VSDC", "transaction flow"]
          },
          {
            number: "3",
            title: "Transaction Processing",
            summary: "トランザクション処理の詳細。GPO発行、Read Record、オフラインデータ認証（fDDA）、CVM処理、Generate AC、オンライン/オフライン判定。",
            keywords: ["transaction processing", "GPO", "fDDA", "CVM", "generate AC", "online", "offline"]
          },
          {
            number: "4",
            title: "Data",
            summary: "Kernel 3で使用されるデータ要素の定義、TLVデータベース、DOL処理規則。",
            keywords: ["data", "TLV", "DOL", "data element"]
          }
        ]
      },
      {
        id: "kernel4",
        title: "Kernel 4 (American Express)",
        filename: "Kernel-C-4-Specification-v2.11-1.pdf",
        pages: null,
        description: "American Express非接触決済用Kernel仕様。ExpressPay仕様に基づく処理フローを定義。",
        chapters: [
          {
            number: "1",
            title: "Introduction",
            summary: "Kernel 4の目的と適用範囲。American Express ExpressPay仕様の概要。",
            keywords: ["american express", "ExpressPay", "introduction"]
          },
          {
            number: "2",
            title: "Architecture",
            summary: "Kernel 4のアーキテクチャとトランザクション処理モデル。",
            keywords: ["architecture", "transaction model"]
          },
          {
            number: "3",
            title: "Transaction Processing",
            summary: "トランザクション処理の詳細。アプリケーション選択、データ読取り、認証、暗号文生成のフロー。",
            keywords: ["transaction processing", "authentication", "cryptogram"]
          }
        ]
      },
      {
        id: "kernel5",
        title: "Kernel 5 (JCB)",
        filename: "C-5_Kernel-5_v2.11.pdf",
        pages: null,
        description: "JCB非接触決済（J/Speedy）用Kernel仕様。JCB独自のContactless処理フローを定義。",
        chapters: [
          {
            number: "1",
            title: "Introduction",
            summary: "Kernel 5の目的と適用範囲。JCB非接触型決済（J/Speedy）の概要。",
            keywords: ["JCB", "J/Speedy", "introduction", "contactless"]
          },
          {
            number: "2",
            title: "Architecture",
            summary: "Kernel 5のアーキテクチャ。JCB Contactless EMVトランザクションの全体構造。",
            keywords: ["architecture", "JCB", "transaction structure"]
          },
          {
            number: "3",
            title: "Transaction Processing",
            summary: "JCB非接触トランザクション処理の詳細。データ読取り、オフラインデータ認証、CVM処理、cryptogram生成。",
            keywords: ["transaction processing", "offline data authentication", "CVM", "cryptogram"]
          }
        ]
      },
      {
        id: "kernel6",
        title: "Kernel 6 (Discover / UnionPay)",
        filename: "C-6_Kernel_6_V_2_11_final_with_bookmarks.pdf",
        pages: null,
        description: "DiscoverおよびUnionPay非接触決済用Kernel仕様。D-PAS/QuickPass処理フローを定義。",
        chapters: [
          {
            number: "1",
            title: "Introduction",
            summary: "Kernel 6の目的と適用範囲。Discover D-PASおよびUnionPay QuickPassの概要。",
            keywords: ["discover", "UnionPay", "D-PAS", "QuickPass", "introduction"]
          },
          {
            number: "2",
            title: "Architecture",
            summary: "Kernel 6のアーキテクチャとトランザクション処理モデル。",
            keywords: ["architecture", "transaction model"]
          },
          {
            number: "3",
            title: "Transaction Processing",
            summary: "Discover/UnionPay非接触トランザクション処理の詳細フロー。",
            keywords: ["transaction processing", "D-PAS", "QuickPass"]
          }
        ]
      },
      {
        id: "kernel7",
        title: "Kernel 7",
        filename: "C-7-Kernel-7-v2-11-Clean-1.pdf",
        pages: null,
        description: "追加ブランド向けKernel仕様。特定の決済ブランドに対応する非接触処理フロー。",
        chapters: [
          {
            number: "1",
            title: "Introduction",
            summary: "Kernel 7の目的と適用範囲。追加ブランドの非接触決済対応。",
            keywords: ["introduction", "additional brand", "contactless"]
          },
          {
            number: "2",
            title: "Architecture",
            summary: "Kernel 7のアーキテクチャと処理モデル。",
            keywords: ["architecture", "processing model"]
          },
          {
            number: "3",
            title: "Transaction Processing",
            summary: "トランザクション処理の詳細。",
            keywords: ["transaction processing"]
          }
        ]
      }
    ]
  }
};
