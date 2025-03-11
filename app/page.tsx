"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, HelpCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function FamilyCoopPlanner() {
  const [skills, setSkills] = useState(["", "", ""])
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(0)
  const [result, setResult] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills]
    newSkills[index] = value
    setSkills(newSkills)
  }

  const handleSubmit = () => {
    // Simple logic to determine role based on skills and hours
    const role = determineRole(skills, hoursPerWeek)
    setResult(role)
    setIsSubmitted(true)
    setCurrentStep(3)
  }

  const determineRole = (skills: string[], hours: number): string => {
    // Convert skills to lowercase for case-insensitive matching
    const normalizedSkills = skills.map((skill) => skill.toLowerCase().trim())

    // Check for creative/artistic interests
    if (
      normalizedSkills.some((skill) =>
        ["絵を描くのが好き", "写真を撮るのが好き", "手作りが好き", "インテリアが好き", "ファッションが好き"].includes(skill),
      )
    ) {
      if (hours >= 30) {
        return "クリエイティブディレクター - 事業の視覚的なイメージやブランドの方向性を決定します。美的センスを活かして全体の雰囲気づくりを担当します。あなたの創造力が事業全体のイメージを形作り、独自の世界観を構築します。顧客の心に残る印象的なブランド体験を生み出す、創造性の司令塔です。"
      } else if (hours >= 15) {
        return "ブランドイメージ担当 - 商品やサービスの見た目、パッケージ、宣伝物のデザイン方向性を決めます。あなたの美的センスが製品の第一印象を決定づけ、競合との差別化を図ります。顧客の目を引き、心に響くビジュアル戦略を展開する重要なポジションです。"
      } else if (hours >= 5) {
        return "ビジュアルコーディネーター - 写真撮影や素材集め、SNS投稿用の画像作成などを担当します。あなたのセンスが事業の「顔」となり、魅力的な視覚イメージでブランドの印象を高めます。写真加工やデザイン編集を通じて、見る人の心を惹きつける視覚的ストーリーを創り出す重要な役割です。"
      } else {
        return "イメージアドバイザー - 商品やサービスの見た目について意見を提供します。あなたの鋭い観察眼と美的センスが、製品やサービスの魅力を最大限に引き出します。少ない時間でも大きな影響を与える、価値あるアドバイスを提供する役割です。"
      }
    }

    // Check for organizational interests
    if (
      normalizedSkills.some((skill) =>
        ["掃除が得意", "整理整頓が好き", "計画を立てるのが好き"].includes(skill),
      )
    ) {
      if (hours >= 30) {
        return "オペレーション責任者 - 事業全体の運営をスムーズに進めるための仕組みづくりを担当します。効率的な業務フローを構築します。あなたの緻密な計画力と実行力が組織の土台となり、混乱のない秩序ある環境を創り出します。すべての活動が円滑に進むよう、縁の下の力持ちとして全体を支える重要なポジションです。"
      } else if (hours >= 15) {
        return "業務改善マネージャー - 日々の業務をより効率的に進めるための改善策を考え、実行します。あなたの問題解決能力と整理整頓の才能が、組織の生産性を飛躍的に高めます。無駄を省き、より良い仕事の流れを設計する、組織の効率化の要となる役割です。"
      } else if (hours >= 5) {
        return "オフィス環境整備担当 - 働きやすい環境づくりや必要な備品の管理を担当します。あなたの気配りと整理能力が、快適で機能的な職場環境を実現します。チーム全員が最高のパフォーマンスを発揮できるよう、理想的な作業空間を創造する大切な役割です。"
      } else {
        return "整理アドバイザー - 物や情報の整理方法について助言を提供します。あなたの整理術が混沌とした状況に秩序をもたらし、効率的な作業環境を実現します。限られた時間でも大きな変化をもたらす、実用的なアドバイスを提供する役割です。"
      }
    }

    // Check for communication/people interests
    if (
      normalizedSkills.some((skill) =>
        ["人と話すのが好き", "聞き上手", "子どもと遊ぶのが好き", "お年寄りと話すのが好き", "人の世話をするのが好き"].includes(skill),
      )
    ) {
      if (hours >= 30) {
        return "カスタマーリレーション責任者 - お客様との信頼関係構築を最重視し、顧客体験の向上に取り組みます。具体的には、顧客の声を集めて分析し、サービス改善に活かしたり、リピーター獲得のための特別プログラムを企画したり、お客様の悩みに寄り添う対応方針を策定します。人との会話を楽しみながら、ビジネスの成長に直結する重要な役割です。"
      } else if (hours >= 15) {
        return "コミュニティマネージャー - お客様同士のつながりを促進し、コミュニティの形成と維持を担当します。あなたの親しみやすさとコミュニケーション能力が、顧客の帰属意識と満足度を高めます。オンライン・オフライン問わず、人と人をつなぎ、活気あるコミュニティを育てる魅力的な役割です。"
      } else if (hours >= 5) {
        return "カスタマーサポート担当 - お客様からの質問や相談に対応し、良好な関係を築きます。あなたの共感力と問題解決能力が、顧客の不安や疑問を解消し、信頼関係を深めます。一人ひとりの顧客に寄り添い、満足度を高める、ビジネスの最前線で活躍する重要な役割です。"
      } else {
        return "コミュニケーションアドバイザー - 人との接し方や効果的なコミュニケーション方法について助言します。あなたの対人スキルと洞察力が、組織全体のコミュニケーションの質を向上させます。少ない時間でも大きな影響を与える、人間関係構築の専門家としての役割です。"
      }
    }

    // Check for writing/research interests
    if (
      normalizedSkills.some((skill) =>
        ["文章を書くのが好き", "調べものが好き", "本を読むのが好き"].includes(skill),
      )
    ) {
      if (hours >= 30) {
        return "コンテンツ戦略責任者 - 事業に関する情報発信全般を統括し、ブログ、SNS、メールなどの内容を企画します。あなたの言葉の力と戦略的思考が、ブランドの声となり、顧客の心に響くメッセージを届けます。情報の海の中で注目を集め、共感を生み出す、コミュニケーション戦略の指揮官です。"
      } else if (hours >= 15) {
        return "コンテンツクリエイター - ブログ記事やSNS投稿、メールマガジンなどの文章を作成します。あなたの表現力と創造性が、読み手の興味を引き、行動を促す魅力的なコンテンツを生み出します。言葉の力でブランドの魅力を伝え、顧客との絆を深める、情報発信の担い手です。"
      } else if (hours >= 5) {
        return "リサーチ担当 - 市場動向や競合情報などを調査し、レポートにまとめます。あなたの好奇心と分析力が、ビジネスの意思決定に不可欠な洞察を提供します。情報を収集・整理し、価値ある知見に変換する、知識の探求者としての役割です。"
      } else {
        return "編集アドバイザー - 文章の内容や表現について助言を提供します。あなたの言語感覚と編集眼が、メッセージの質と効果を高めます。限られた時間でも、文章の魅力を引き出し、より伝わりやすくする専門的なアドバイスを提供する役割です。"
      }
    }

    // Check for food/cooking interests
    if (
      normalizedSkills.some((skill) =>
        ["料理が好き", "食べるのが好き"].includes(skill),
      )
    ) {
      if (hours >= 30) {
        return "フードサービス責任者 - 社内イベントや接客時の飲食提供を統括し、食を通じた体験価値を高めます。あなたの料理の腕前と演出センスが、忘れられない食体験を創り出します。食を通じて人々をつなぎ、幸せな時間を提供する、味覚と感動の演出家です。"
      } else if (hours >= 15) {
        return "ケータリングマネージャー - ミーティングや来客時の飲食提供を企画・手配します。あなたの食への情熱とホスピタリティが、ビジネスシーンに彩りと活力をもたらします。適切な食事提供で会議の生産性を高め、おもてなしの心で信頼関係を築く重要な役割です。"
      } else if (hours >= 5) {
        return "フードコーディネーター - 商品撮影時の食事準備や、イベント時の軽食準備を担当します。あなたの味覚センスと盛り付けの技が、食事の時間を特別なものに変えます。見た目も味も満足できる食体験を提供し、場の雰囲気を高める食の演出家です。"
      } else {
        return "フードアドバイザー - メニュー選びや食事の演出について助言を提供します。あなたの食の知識と感性が、食事シーンの質を向上させます。限られた時間でも、食を通じた満足感と喜びを最大化するアドバイスを提供する、味覚のガイド役です。"
      }
    }

    // Check for nature/outdoor interests
    if (
      normalizedSkills.some((skill) =>
        ["動物が好き", "植物・花が好き", "散歩が好き", "旅行が好き"].includes(skill),
      )
    ) {
      if (hours >= 30) {
        return "環境・福利厚生責任者 - 社内の環境づくりや従業員の健康促進活動を統括します。自然要素を取り入れた職場づくりを行います。あなたの自然への愛と環境デザインのセンスが、働く人々の幸福度と創造性を高めます。持続可能で心地よい職場環境を創造し、組織の活力を引き出す重要なポジションです。"
      } else if (hours >= 15) {
        return "オフィスグリーン担当 - 植物を活用した空間づくりや、自然を感じられるイベントを企画します。あなたの植物への愛情と空間デザイン能力が、オフィスに生命力と癒しをもたらします。緑あふれる環境で働く喜びを提供し、ストレス軽減と創造性向上に貢献する役割です。"
      } else if (hours >= 5) {
        return "リフレッシュ活動担当 - 従業員のリフレッシュのための散歩会や小旅行を企画します。あなたの冒険心と計画力が、日常から離れた新鮮な体験を提供します。心身のリフレッシュを促し、チームの結束を強める、活力を生み出す役割です。"
      } else {
        return "環境アドバイザー - より自然を感じられる空間づくりについて助言を提供します。あなたの自然観察力と環境感覚が、より心地よい空間づくりに貢献します。少ない時間でも、自然の要素を取り入れた癒しの環境を実現するアドバイスを提供する役割です。"
      }
    }

    // Check for wellness/health interests
    if (
      normalizedSkills.some((skill) =>
        ["健康に気を使う", "美容に興味がある", "スポーツが好き"].includes(skill),
      )
    ) {
      if (hours >= 30) {
        return "ウェルネス責任者 - 従業員の健康増進プログラムを統括し、健康経営を推進します。あなたの健康への造詣と指導力が、組織全体の活力と生産性を高めます。心身ともに健康な職場文化を創造し、長期的な成功と幸福を実現する、組織の健康を守る重要なポジションです。"
      } else if (hours >= 15) {
        return "健康促進マネージャー - 健康的な職場環境づくりや、運動促進イベントを企画します。あなたの健康知識とモチベーション力が、従業員の生活習慣改善と健康意識向上を促します。楽しみながら健康になれるプログラムを提供し、活気ある職場づくりに貢献する役割です。"
      } else if (hours >= 5) {
        return "ウェルネスコーディネーター - オフィスでのストレッチタイムや健康的な軽食の提供を担当します。あなたの健康への配慮と実践力が、日々の小さな健康習慣を定着させます。忙しい業務の合間に心身をリフレッシュする機会を創出し、健康意識を高める役割です。"
      } else {
        return "健康アドバイザー - より健康的な職場習慣について助言を提供します。あなたの健康知識と実践経験が、職場の健康文化の形成に貢献します。簡単に取り入れられる健康習慣のアドバイスで、全員の健康と幸福度を高める専門家としての役割です。"
      }
    }

    // Check for shopping/trend interests
    if (
      normalizedSkills.some((skill) =>
        ["買い物が好き", "新しいものが好き"].includes(skill),
      )
    ) {
      if (hours >= 30) {
        return "トレンド戦略責任者 - 最新の市場動向を分析し、新しい商品やサービスの方向性を提案します。あなたの先見性と市場感覚が、ビジネスの未来を形作ります。常に一歩先を行く視点で、競争優位性を確立し、革新的な成長戦略を導く、トレンドの先駆者としての役割です。"
      } else if (hours >= 15) {
        return "マーケットリサーチャー - 新しい商品やサービスのトレンドを調査し、事業に活かせる情報を収集します。あなたの好奇心と分析力が、市場の変化を捉え、ビジネスチャンスを見出します。データと直感を組み合わせ、成功の可能性を高める洞察を提供する、市場の探検家です。"
      } else if (hours >= 5) {
        return "トレンドスカウト - 新しい商品やサービスの情報を集め、定期的にレポートします。あなたの鋭い観察眼と情報収集能力が、最新トレンドをいち早くキャッチします。市場の動きを常に監視し、新たな可能性を発見する、トレンドのアンテナ役です。"
      } else {
        return "トレンドアドバイザー - 最新の流行や消費者の好みについて助言を提供します。あなたのトレンド感覚と直感が、時代の空気を読み取り、的確な方向性を示します。限られた時間でも、価値ある市場洞察を提供する、流行の案内人としての役割です。"
      }
    }

    // Check for entertainment interests
    if (
      normalizedSkills.some((skill) =>
        ["映画鑑賞が好き", "音楽が好き"].includes(skill),
      )
    ) {
      if (hours >= 30) {
        return "エンターテインメント戦略責任者 - 事業に関連するイベントや体験の企画を統括し、感動を提供します。あなたのエンターテインメントセンスと演出力が、忘れられない体験と感動の瞬間を創り出します。人々の心に残る記憶を設計し、ブランドへの愛着を深める、感動体験の総合プロデューサーです。"
      } else if (hours >= 15) {
        return "イベントプランナー - 社内外のイベントを企画し、実行します。あなたの創造力と実行力が、特別な場と時間を演出します。人々が集い、交流し、楽しむ機会を創出し、組織の文化と結束を強める、体験デザイナーとしての役割です。"
      } else if (hours >= 5) {
        return "エンターテインメントコーディネーター - オフィスやイベントでの音楽選びや映像演出を担当します。あなたの感性と演出センスが、空間の雰囲気を一変させ、感情に訴える体験を生み出します。音や映像を通じて場の魅力を高め、記憶に残る瞬間を創造する役割です。"
      } else {
        return "エンターテインメントアドバイザー - イベントや演出について助言を提供します。あなたのエンターテインメント知識と感性が、体験の質を向上させます。限られた時間でも、イベントの魅力を最大化するアイデアを提供する、体験価値の向上に貢献する役割です。"
      }
    }

    // Default case based on hours available
    if (hours >= 30) {
      return "共同創業者 - 事業の中核的な意思決定に参加し、複数の重要な領域に責任を持ちます。あなたのビジョンとリーダーシップが、組織の方向性と成長を決定づけます。創業者と共に夢を形にし、困難を乗り越え、成功への道を切り拓く、事業の共同設計者です。"
    } else if (hours >= 20) {
      return "事業部門責任者 - 事業の特定の部門や機能を監督し、その成長と成功に責任を持ちます。あなたの専門知識と管理能力が、担当領域の卓越性と革新を実現します。戦略的思考と実行力で部門目標を達成し、組織全体の成功に貢献する重要なリーダーです。"
    } else if (hours >= 10) {
      return "プロジェクトマネージャー - 特定のプロジェクトやイニシアチブを担当します。あなたの計画力と調整能力が、複雑なプロジェクトを成功に導きます。目標設定から実行、評価まで一貫して管理し、チームの力を最大限に引き出す、プロジェクト成功の要です。"
    } else if (hours >= 5) {
      return "専門アドバイザー - 特定の分野での知識と経験を活かして、定期的なアドバイスを提供します。あなたの専門性と洞察力が、重要な意思決定の質を高めます。的確なアドバイスで問題解決を支援し、組織の成長と改善に貢献する知恵の源泉です。"
    } else {
      return "サポートスタッフ - 特定のタスクや週単位のサポートを提供します。あなたの柔軟性と実行力が、チームの業務をスムーズに進める助けとなります。限られた時間でも確実に価値を提供し、組織の日々の活動を支える大切な一員です。"
    }
  }

  const predefinedSkills = [
    "料理が好き",
    "掃除が得意",
    "整理整頓が好き",
    "人と話すのが好き",
    "聞き上手",
    "動物が好き",
    "植物・花が好き",
    "食べるのが好き",
    "散歩が好き",
    "旅行が好き",
    "本を読むのが好き",
    "映画鑑賞が好き",
    "音楽が好き",
    "子どもと遊ぶのが好き",
    "お年寄りと話すのが好き",
    "手作りが好き",
    "絵を描くのが好き",
    "写真を撮るのが好き",
    "文章を書くのが好き",
    "調べものが好き",
    "計画を立てるのが好き",
    "新しいものが好き",
    "人の世話をするのが好き",
    "買い物が好き",
    "インテリアが好き",
    "ファッションが好き",
    "スポーツが好き",
    "健康に気を使う",
    "美容に興味がある",
  ]

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetForm = () => {
    setSkills(["", "", ""])
    setHoursPerWeek(0)
    setResult(null)
    setIsSubmitted(false)
    setCurrentStep(1)
  }

  const isStepOneComplete = skills.filter(Boolean).length >= 1
  const isStepTwoComplete = hoursPerWeek > 0

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen flex flex-col bg-soft-blue">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-dark-blue">家族起業サポートプランナー</h1>
          <p className="text-xl jp-text text-soft-black">
            パートナーの好きなことや得意なことから、起業での最適な役割を提案するツールです
          </p>
        </div>

        <div className="mb-10">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-bright-blue text-white' : 'bg-soft-blue text-dark-blue border border-bright-blue'}`}>
                1
              </div>
              <span className="ml-3 font-medium text-lg jp-text-wide text-dark-blue">
                好きなこと<span className="middle-dot">・</span>得意なことを選択
              </span>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-bright-blue text-white' : 'bg-soft-blue text-dark-blue border border-bright-blue'}`}>
                2
              </div>
              <span className="ml-3 font-medium text-lg text-dark-blue">時間設定</span>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-bright-blue text-white' : 'bg-soft-blue text-dark-blue border border-bright-blue'}`}>
                3
              </div>
              <span className="ml-3 font-medium text-lg text-dark-blue">結果確認</span>
            </div>
          </div>
          <Progress value={(currentStep / 3) * 100} className="h-3 bg-soft-blue" />
        </div>

        <Card className="shadow-lg border-soft-blue">
          <CardHeader className="border-b pb-5 bg-soft-blue card-header">
            <CardTitle className="text-2xl text-dark-blue">
              {currentStep === 1 && <span className="jp-text-wide">ステップ1: 好きなこと<span className="middle-dot">・</span>得意なことを選択</span>}
              {currentStep === 2 && "ステップ2: 週の協力可能時間を設定"}
              {currentStep === 3 && "ステップ3: 提案される役割"}
            </CardTitle>
            <CardDescription className="jp-text text-base mt-2 text-soft-black">
              {currentStep === 1 && <span>パートナーの好きなことや得意なことを最大3つまで選択してください。少なくとも1つは必要です。</span>}
              {currentStep === 2 && "週にどれくらいの時間、事業に協力できるかを設定してください。"}
              {currentStep === 3 && "好きなことと時間から、最適な役割を提案します。"}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8 card-content">
            {currentStep === 1 && (
              <div className="space-y-8">
                <Alert className="bg-blue-100 border-blue-300 alert">
                  <Info className="h-5 w-5 text-blue-600" />
                  <AlertTitle className="text-blue-800 alert-title text-lg">使い方ガイド</AlertTitle>
                  <AlertDescription className="text-blue-700 jp-text">
                    パートナーの好きなことや得意なことを選択することで、起業における最適な役割分担を提案します。
                    少なくとも1つは選択してください。
                  </AlertDescription>
                </Alert>

                <div className="grid gap-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-3 form-group">
                      <div className="flex items-center">
                        <Label htmlFor={`skill-${index}`} className="mr-2 form-label text-base jp-text-wide text-dark-blue">
                          好きなこと<span className="middle-dot">・</span>得意なこと {index + 1}
                        </Label>
                        {index === 0 && (
                          <Badge variant="outline" className="ml-1 text-xs bg-bright-blue text-white">必須</Badge>
                        )}
                        {index > 0 && (
                          <Badge variant="outline" className="ml-1 text-xs text-dark-blue bg-soft-blue">任意</Badge>
                        )}
                      </div>
                      <Select value={skill} onValueChange={(value) => handleSkillChange(index, value)}>
                        <SelectTrigger id={`skill-${index}`} className="select-text text-base h-12 bg-white text-soft-black input-field">
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {predefinedSkills.map((predefinedSkill) => (
                            <SelectItem key={predefinedSkill} value={predefinedSkill} className="select-text text-base py-2 text-soft-black">
                              {predefinedSkill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <Alert className="bg-blue-100 border-blue-300 alert">
                  <Info className="h-5 w-5 text-blue-600" />
                  <AlertTitle className="text-blue-800 alert-title text-lg">時間の重要性</AlertTitle>
                  <AlertDescription className="text-blue-700 jp-text">
                    週の協力可能時間は、提案される役割の範囲と責任レベルに大きく影響します。
                    より多くの時間が確保できるほど、より重要な役割が提案されます。
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hours" className="text-lg form-label text-dark-blue">週の協力可能時間</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-bright-blue">
                            <HelpCircle className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="p-4 text-base jp-text bg-white text-soft-black">
                          <p className="max-w-xs">週に何時間程度、事業に協力できるかを入力してください。この時間によって提案される役割が変わります。</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      id="hours"
                      type="number"
                      min="0"
                      max="40"
                      value={hoursPerWeek || ""}
                      onChange={(e) => setHoursPerWeek(Number.parseInt(e.target.value) || 0)}
                      className="max-w-[120px] text-lg h-12 bg-white text-soft-black input-field"
                    />
                    <span className="text-lg text-dark-blue">時間/週</span>
                  </div>

                  <div className="pt-6">
                    <Tabs defaultValue="low" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 h-auto tabs-list">
                        <TabsTrigger value="verylow" onClick={() => setHoursPerWeek(3)} className="py-3 text-base data-[state=active]:tab-active">わずか<br/>(~3時間)</TabsTrigger>
                        <TabsTrigger value="low" onClick={() => setHoursPerWeek(8)} className="py-3 text-base data-[state=active]:tab-active">少ない<br/>(~8時間)</TabsTrigger>
                        <TabsTrigger value="medium" onClick={() => setHoursPerWeek(20)} className="py-3 text-base data-[state=active]:tab-active">中程度<br/>(~20時間)</TabsTrigger>
                        <TabsTrigger value="high" onClick={() => setHoursPerWeek(35)} className="py-3 text-base data-[state=active]:tab-active">多い<br/>(~35時間)</TabsTrigger>
                      </TabsList>
                      <TabsContent value="verylow" className="mt-4 p-4 bg-blue-50 rounded-md jp-text">
                        <p className="text-base text-blue-800">週3時間程度の協力が可能です。限定的なアドバイスや特定の小さなタスクに適しています。</p>
                      </TabsContent>
                      <TabsContent value="low" className="mt-4 p-4 bg-blue-50 rounded-md jp-text">
                        <p className="text-base text-blue-800">週8時間程度の協力が可能です。特定のタスクや限定的なサポートに適しています。</p>
                      </TabsContent>
                      <TabsContent value="medium" className="mt-4 p-4 bg-blue-50 rounded-md jp-text">
                        <p className="text-base text-blue-800">週20時間程度の協力が可能です。プロジェクト管理や特定の部門の責任者に適しています。</p>
                      </TabsContent>
                      <TabsContent value="high" className="mt-4 p-4 bg-blue-50 rounded-md jp-text">
                        <p className="text-base text-blue-800">週35時間程度の協力が可能です。事業の中核的な役割や共同創業者としての参画に適しています。</p>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && result && (
              <div className="space-y-8">
                <div className="flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>

                <div className="p-8 bg-soft-blue rounded-lg border border-soft-blue">
                  <h3 className="text-2xl font-semibold mb-4 text-dark-blue">提案される役割</h3>
                  <div className="flex items-start gap-4 mb-5">
                    <Badge variant="default" className="mt-1 px-3 py-1 text-base bg-bright-blue text-white">
                      提案
                    </Badge>
                    <p className="text-xl font-medium jp-text text-dark-blue">{result.split(' - ')[0]}</p>
                  </div>
                  <p className="text-soft-black text-lg jp-text-wide leading-relaxed">{result.split(' - ')[1]}</p>
                </div>

                <div className="space-y-5 mt-8 p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-xl text-blue-800">入力情報</h4>
                  <div className="grid grid-cols-2 gap-6 text-base">
                    <div>
                      <p className="text-blue-700 mb-3 jp-text-wide">選択した好きなこと<span className="middle-dot">・</span>得意なこと:</p>
                        <ul className="mt-1 space-y-3">
                          {skills.filter(Boolean).map((skill, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle2 className="h-4 w-4 mr-3 text-green-500 flex-shrink-0" />
                              <span className="jp-text text-soft-black">{skill}</span>
                            </li>
                          ))}
                        </ul>
                    </div>
                    <div>
                      <p className="text-blue-700 mb-3">週の協力可能時間:</p>
                      <p className="mt-1 font-medium text-xl text-soft-black">{hoursPerWeek}時間/週</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6 card-footer">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={goToPreviousStep} className="text-base py-6 px-8 btn-outline">
                戻る
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep === 1 ? (
              <Button
                onClick={goToNextStep}
                disabled={!isStepOneComplete}
                className="text-base py-6 px-8 btn-primary"
              >
                次へ
              </Button>
            ) : currentStep === 3 ? (
              <div className="flex gap-3">
                <Button variant="outline" onClick={resetForm} className="text-base py-6 px-8 btn-outline">
                  最初からやり直す
                </Button>
              </div>
            ) : null}

            {currentStep === 2 && isStepTwoComplete && (
              <Button onClick={handleSubmit} className="text-base py-6 px-8 btn-primary">
                結果を確認
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="mt-10 text-center text-base text-dark-blue jp-text-wide">
          <p>家族起業サポートプランナー © 2025 - 好きなことと時間から最適な役割を提案</p>
        </div>
      </div>
    </div>
  )
}

