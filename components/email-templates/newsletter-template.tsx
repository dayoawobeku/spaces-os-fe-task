import sortBy from "lodash/sortBy";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Markdown,
  Row,
  Section,
  Text,
} from "@react-email/components";

import { Newsletter, NewsletterSection } from "@/lib/types";

interface NewsletterTemplateProps {
  newsletter: Newsletter;
}

const renderSection = (section: NewsletterSection) => {
  switch (section.type) {
    case "text":
      return (
        <Markdown
          key={section.id}
          markdownCustomStyles={{
            p: textStyle,
            h1: {
              ...textStyle,
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "12px",
            },
            h2: {
              ...textStyle,
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
            },
            h3: {
              ...textStyle,
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
            },
          }}
        >
          {section.content || ""}
        </Markdown>
      );
    case "image":
      return section.metadata?.imageUrl ? (
        <Section key={section.id} style={imageSectionStyle}>
          <Img
            src={section.metadata.imageUrl}
            alt={section.metadata.imageAlt || "Newsletter image"}
            style={imageStyle}
          />
        </Section>
      ) : null;
    case "button":
      return (
        <Section key={section.id} style={buttonSectionStyle}>
          <Link href={section.metadata?.buttonUrl} style={buttonStyle}>
            {section.metadata?.buttonText || section.content}
          </Link>
        </Section>
      );
    case "divider":
      return <Hr key={section.id} style={hrStyle} />;
    default:
      return null;
  }
};

export function NewsletterTemplate({ newsletter }: NewsletterTemplateProps) {
  const sortedSections = sortBy(newsletter.sections, ["order"]);

  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerSectionStyle}>
            <Text style={brandStyle}>📧 Newsletter</Text>
          </Section>

          <Section style={subjectSectionStyle}>
            <Heading style={subjectHeadingStyle}>{newsletter.subject}</Heading>
          </Section>

          <Section style={contentSectionStyle}>
            {sortedSections.map(renderSection)}
          </Section>

          <Hr style={separatorStyle} />

          <Section style={footerSectionStyle}>
            <Row>
              <Column style={footerColumnStyle}>
                <Text style={footerTextStyle}>© 2025 Your Company Name</Text>
              </Column>
              <Column style={footerColumnRightStyle}>
                <Text style={footerTextStyle}>
                  <Link href="#" style={linkStyle}>
                    Unsubscribe
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  margin: "0",
  padding: "0",
  backgroundColor: "#f9fafb",
  lineHeight: "1.6",
};

const containerStyle = {
  backgroundColor: "#ffffff",
  marginTop: "20px",
  marginBottom: "20px",
  maxWidth: "600px",
  margin: "20px auto",
};

const headerSectionStyle = {
  backgroundColor: "#1f2937",
  padding: "32px",
  textAlign: "center" as const,
};

const brandStyle = {
  color: "#f9fafb",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const subjectSectionStyle = {
  padding: "32px 32px 16px 32px",
};

const subjectHeadingStyle = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 24px 0",
  lineHeight: "1.3",
};

const contentSectionStyle = {
  padding: "0 32px 32px 32px",
};

const textStyle = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#374151",
  marginBottom: "16px",
};

const imageSectionStyle = {
  margin: "24px 0",
};

const imageStyle = {
  maxWidth: "100%",
  height: "auto",
};

const buttonSectionStyle = {
  margin: "24px 0",
};

const buttonStyle = {
  display: "inline-block",
  padding: "14px 28px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "14px",
};

const hrStyle = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "24px 0",
};

const separatorStyle = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "0",
};

const footerSectionStyle = {
  padding: "24px 32px",
};

const footerColumnStyle = {
  width: "50%",
};

const footerColumnRightStyle = {
  width: "50%",
  textAlign: "right" as const,
};

const footerTextStyle = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "0",
};

const linkStyle = {
  color: "#2563eb",
  textDecoration: "none",
};
