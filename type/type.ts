import { 
  IoShieldCheckmarkOutline, 
  IoLockOpenOutline, 
  IoTimerOutline, 
  IoGitMergeOutline, 
  IoCutOutline} from "react-icons/io5"
import { SiConvertio } from "react-icons/si"
import type { IconType } from "react-icons"
    
interface Options {
  id: string;
  name: string;
}
export const conversionOptions: Options[] = [
  {name: "PDF", id: "1"},
  {name: "PNG", id: "2"},
  {name: "JPG", id: "3"},
  {name: "jPEG", id: "4"},
  {name: "WEBP", id: "5"}
  ]
// Types of card data
export type CardItem = {
  icon: IconType
  title: string
  description: string
  button: string
  link : string
}

export type SecondCardItem = {
  icon: IconType
  title: string
  description: string
}

// Types of api data
export interface Conversion {
  file_url: string;
  output_file_url: string;
  file_type: string;
  target_type: string;
}

export interface ConversionPayload {
  input_file: string;
  output_format: string;
  custom_output_url?: string;
}

export interface MergedFile {
  files: string[]
  merged_file: string
  created_at?: string
}

export interface SplitFile {
  file_name: string | null
  page_ranges: [number, number][]
  split_files: string[] | null
  created_at?: string
}



// Main section cards
export const cardsData: CardItem[] = [
  {
    icon: IoGitMergeOutline,
    title: "Merge Api",
    description: `Combine multiple files or data sources into a single output. Our merge API allows you to seamlessly combine multiple files, documents, or data sources into a unified format.`,
    button: "Try Marge",
    link: "/merge"
  },

  {
    icon: IoCutOutline,
    title: "Split Api",
    description: "Extract and split PDF pages quickly and accurately. The split API enables you to divide large files or data sets into smaller, more manageable pieces with precision.",
    button: "Try Split",
    link: "/split"
  },
  {
    icon: SiConvertio,
    title: "Conversion Api",
    description: "Shrink PDF file sizes while maintaining quality. Easily convert files between various formats including documents, images, audio, and video with our powerful conversion API.",
    button: "Try Conversion",
    link: "/conversions"
  },
]


// Cards For Section Why choose us 

export const whyChooseSectionData: SecondCardItem[] = [
  {
    icon: IoShieldCheckmarkOutline,
    title: "Secure & Private",
    description: "We never store your documents. Everything is processed locally or securely deleted.",
  },
  {
    icon: IoTimerOutline,
    title: "Lightning Fast",
    description: "Optimized for speed, our tools process PDFs in seconds.",
  },
  {
    icon: IoLockOpenOutline,
    title: "No Sign-Up Required",
    description: "All tools are free and available to use without creating an account.",
  },
]