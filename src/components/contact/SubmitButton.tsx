// components/contact/SubmitButton.tsx
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  isValid: boolean;
}

const SubmitButton = ({ isLoading, isValid }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full" 
      size="lg"
      disabled={isLoading || !isValid}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Đang gửi...
        </>
      ) : (
        'Gửi tin nhắn'
      )}
    </Button>
  );
};

export default SubmitButton;