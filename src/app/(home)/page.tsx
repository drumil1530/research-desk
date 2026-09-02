import { Frame, FrameHeader, FrameTitle } from "@/coss/ui/frame";
import SignOutButton from "@/features/auth/components/sign-out-button";

export default function HomePage() {
  return (
    <Frame>
      <FrameHeader>
        <FrameTitle>Research Desk</FrameTitle>
        <SignOutButton />
      </FrameHeader>
    </Frame>
  );
}
