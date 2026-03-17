// ===================================================
// EMV Sequence Diagram Data
// ===================================================

const SEQUENCE_DATA = [
  {
    id: "contact-standard",
    title: "Standard Contact EMV Transaction Flow",
    category: "contact",
    description: "接触型EMVカードにおける標準的なトランザクションの全体フロー（アプリケーション選択から完了まで）。",
    mermaid: `
sequenceDiagram
    participant T as Terminal
    participant C as ICC (Card)
    participant I as Issuer (Host)

    Note over T,C: 1. Application Selection
    T->>C: SELECT (PSE)
    C-->>T: FCI (Supported Apps)
    T->>C: SELECT (AID)
    C-->>T: FCI (PDOL, Language, etc.)

    Note over T,C: 2. Initiate Application Processing
    T->>C: GET PROCESSING OPTIONS (PDOL Data)
    C-->>T: AIP, AFL

    Note over T,C: 3. Read Application Data
    loop For each file in AFL
        T->>C: READ RECORD (SFI, Record Number)
        C-->>T: Tag Data (PAN, Expiry, CDOLs, etc.)
    end

    Note over T,C: 4. Offline Data Authentication (SDA/DDA/CDA)
    opt If DDA/CDA supported
        T->>C: INTERNAL AUTHENTICATE (Auth Data)
        C-->>T: Signed Dynamic Application Data
    end

    Note over T,C: 5. Processing Restrictions & Risk Management
    Note over T,C: Terminal checks TVR, Version, Expiry, Floor Limits

    Note over T,C: 6. Cardholder Verification (CVM)
    opt If Offline PIN required
        T->>C: VERIFY (PIN Data)
        C-->>T: SW1 SW2 (Success/Failure)
    end

    Note over T,C: 7. Terminal Action Analysis
    Note over T,C: Terminal decides Online, Offline, or Decline

    Note over T,C: 8. First Generate AC
    T->>C: GENERATE AC (CDOL1 Data)
    alt Terminal requests Online (ARQC)
        C-->>T: ARQC (Application Request Cryptogram)
        T->>I: Authorization Request (ARQC)
        I-->>T: Authorization Response (ARPC, ARC)
        
        Note over T,C: 9. Online Processing & Issuer Auth
        T->>C: EXTERNAL AUTHENTICATE (ARPC)
        C-->>T: SW1 SW2
        
        Note over T,C: 10. Second Generate AC (Completion)
        T->>C: GENERATE AC (CDOL2 Data)
        C-->>T: TC (Approve) or AAC (Decline)
    else Terminal requests Offline (TC)
        C-->>T: TC (Transaction Certificate)
    end
    `,
    steps: [
      { step: "1. Application Selection", description: "ターミナルがカード内の利用可能なアプリケーション（AID）を特定し、選択します。SELECTコマンドに対してカードはFCI（File Control Information）を返します。" },
      { step: "2. Initiate Application", description: "GPOコマンドを実行し、ターミナルから必要なデータ（PDOL）を渡します。カードはAIPとデータの読み取り位置を示すAFLを返します。" },
      { step: "3. Read Application Data", description: "ターミナルはAFLの指示に従い、READ RECORDコマンドでカード内からPANや有効期限、各種リスト（CDOL等）を読み取ります。" },
      { step: "4. Offline Data Authentication", description: "カードの真正性をオフラインで検証します（SDA, DDA, またはCDA）。DDA/CDAの場合はINTERNAL AUTHENTICATEコマンドが使用されます。" },
      { step: "5. Processing Restrictions", description: "アプリケーションのバージョン、有効期限、利用可能国などの各種制限をターミナルがチェックします。" },
      { step: "6. Cardholder Verification", description: "CVMリストに基づき、カード保有者の本人確認（PIN入力やサインなど）を行います。" },
      { step: "7. Terminal Action Analysis", description: "これまでのチェック結果（TVR）に基づき、ターミナルが「オフライン承認」「オンライン通信」「拒否」のいずれかを決定します。" },
      { step: "8. First Generate AC", description: "決定に基づき、GENERATE ACコマンドでカードに暗号文を要求します（オンラインならARQC、オフラインならTC等）。" },
      { step: "9 & 10. Completion", description: "オンライン通信が行われた場合はEXTERNAL AUTHENTICATEでイシュア認証を行い、2回目のGENERATE ACで最終的な取引結果（TCまたはAAC）を取得します。" }
    ]
  },
  {
    id: "contactless-emv-mode",
    title: "Contactless EMV Mode Flow",
    category: "contactless",
    description: "非接触EMVモード（一部のカーネルを除く一般的なフロー）の概要。接触型に比べて処理が最適化され、高速化されています。",
    mermaid: `
sequenceDiagram
    participant T as Terminal
    participant C as PICC (Card/Mobile)
    
    Note over T,C: 1. Polling & Collision Detection (WUPA/ATQA)
    
    Note over T,C: 2. Application Selection
    T->>C: SELECT (PPSE - Proximity Payment System Environment)
    C-->>T: FCI (Available AIDs for Contactless)
    T->>C: SELECT (Specific AID)
    C-->>T: FCI (PDOL)

    Note over T,C: 3. Initiate & Read Data
    T->>C: GET PROCESSING OPTIONS (PDOL Data)
    C-->>T: AIP, AFL (often includes Application File Locator)
    
    loop Quickly Read Records
        T->>C: READ RECORD (SFI, Record Number)
        C-->>T: Tag Data (PAN, Expiry, CDOL1)
    end
    
    Note over T,C: 4. Offline Data Authentication (fDDA/CDA)
    Note over T,C: Required data gathered for fast authentication
    
    Note over T,C: 5. Processing Restrictions & Action Analysis
    
    Note over T,C: 6. Request Cryptogram
    T->>C: GENERATE AC (CDOL1 Data)
    alt Offline Approved
        C-->>T: TC (Transaction Certificate) + CDA Signature
    else Online Required
        C-->>T: ARQC (Application Request Cryptogram)
    end
    
    Note over T,C: 7. Removal of Card from Field
    Note over T: Terminal processes ARQC online or completes offline.
    `,
    steps: [
      { step: "1. Polling", description: "リーダー（ターミナル）が電波を出し、カード（PICC）を検知します（ISO 14443）。" },
      { step: "2. Select PPSE", description: "非接触特有のPPSE（Proximity Payment System Environment）を選択し、利用可能なアプリのリストを取得して一つを選択します。" },
      { step: "3. Initiate & Read", description: "GPOとREAD RECORDを実行します。非接触では処理時間を短くするため、最小限のデータ構成に最適化されています。" },
      { step: "4. Offline Authentication", description: "高速化されたDDA（fDDA）またはCDAが実行され、偽造カードでないことを確認します。" },
      { step: "5. Restrictions & Analysis", description: "金額が非接触限度額（Contactless Floor Limit）を超えていないか、CVM（PIN）が必要かをチェックし、結果を決定します。" },
      { step: "6. Request Cryptogram", description: "GENERATE ACを発行し、一回のコマンドでTC（オフライン承認）またはARQC（オンライン要求）を取得して、カードとの通信はここで終了（Tear）することが多いです。" }
    ]
  }
];
