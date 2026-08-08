import {
  Code2,
  Smartphone,
  CloudCog,
  Megaphone,
  Palette,
  Compass,
  Workflow,
  Bot,
  Sparkles,
  BrainCircuit,
  Cpu,
  Database,
  HeartHandshake,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Icon lookup for services. Icons are resolved inside the consuming component
 * (server or client) so component functions are never passed across the
 * server → client boundary as props.
 */
const icons: Record<string, LucideIcon> = {
  "web-development": Code2,
  "mobile-app-development": Smartphone,
  "cloud-solutions-devops": CloudCog,
  "social-media": Megaphone,
  "ui-ux-design": Palette,
  "it-consulting-strategy": Compass,
  "ai-powered-applications": Cpu,
  "ai-automation": Workflow,
  "ai-chatbots": Bot,
  "generative-ai-content": Sparkles,
  "agentic-ai": BrainCircuit,
  "erp-systems": Database,
  "csm-systems": HeartHandshake,
  "crm-systems": Users,
};

export function getServiceIcon(slug: string): LucideIcon {
  return icons[slug] ?? Code2;
}
