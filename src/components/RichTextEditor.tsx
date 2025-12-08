import React, { useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from 'lowlight';
import { Button } from "@/components/ui/button";
import { 
  Upload, Bold, Italic, Heading2, List, Code, Table as TableIcon, 
  Link as LinkIcon, Quote, ListOrdered, Heading1, Heading3, 
  Undo, Redo, Plus, Minus, Columns, Rows
} from "lucide-react";
import { supabase } from "@/services/supabase";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Tạo lowlight instance
const lowlight = createLowlight(common);

export default function RichTextEditor({ value, onChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showTableOptions, setShowTableOptions] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
        validate: href => /^https?:\/\//.test(href), // Chỉ chấp nhận http/https
      }),
      Placeholder.configure({
        placeholder: "Nhập nội dung của bạn...",
      }),
      Table.configure({
        resizable: true,
        lastColumnResizable: true,
        allowTableNodeSelection: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
    const html = editor.getHTML();
    const text = editor.getText().trim();
    
    // Kiểm tra nếu thực sự trống
    const isEmpty = !text && (
      html === '<p></p>' || 
      html === '<p><br></p>' || 
      html === '' || 
      html === '<br>' ||
      html === '<p> </p>' ||
      html === '<p>&nbsp;</p>'
    );
    
    onChange(isEmpty ? '' : html);
  },
    editorProps: {
    attributes: {
      class: 'prose prose-lg max-w-none focus:outline-none min-h-[250px] p-4 text-gray-900',
      'data-placeholder': 'Bắt đầu nhập nội dung của bạn ở đây...',
    },
  },
  });

  const handleEditorUpdate = () => {
  if (!editor) return;
  
  const html = editor.getHTML();
  const text = editor.getText().trim();
  
  // Nếu editor thực sự trống
  if (!text && (html === '<p></p>' || html === '<p><br></p>' || html === '')) {
      // Reset editor về trạng thái trống hoàn toàn
      editor.commands.clearContent(true); // true để giữ focus
      onChange('');
    } else {
      onChange(html);
    }
  };
  // Hàm xử lý click toolbar - FIX SCROLL JUMP
  const handleToolbarClick = (callback) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
    // Ngăn scroll jump
    setTimeout(() => {
      editor?.commands.focus();
    }, 10);
  };

  // Hàm chèn heading
  const insertHeading1 = () => {
    if (!editor) return;
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  };

  const insertHeading2 = () => {
    if (!editor) return;
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  };

  const insertHeading3 = () => {
    if (!editor) return;
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  };

  // Hàm chèn bullet list
  const insertBulletList = () => {
    if (!editor) return;
    
    editor.chain().focus().toggleBulletList().run();
    
    // Nếu chưa có nội dung, thêm mẫu
    if (!editor.getText().trim()) {
      setTimeout(() => {
        editor.chain().focus()
          .insertContent('• Mục đầu tiên trong danh sách')
          .run();
      }, 10);
    }
  };

  // Hàm chèn ordered list
  const insertOrderedList = () => {
    if (!editor) return;
    
    editor.chain().focus().toggleOrderedList().run();
    
    // Nếu chưa có nội dung, thêm mẫu
    if (!editor.getText().trim()) {
      setTimeout(() => {
        editor.chain().focus()
          .insertContent('1. Mục thứ nhất')
          .run();
      }, 10);
    }
  };

  // Hàm chèn trích dẫn
  const insertQuote = () => {
    if (!editor) return;
    
    editor.chain().focus().toggleBlockquote().run();
    
    // Thêm dấu ngoặc kép nếu chưa có nội dung
    if (!editor.getText().trim()) {
      setTimeout(() => {
        editor.chain().focus()
          .insertContent('"Nhập nội dung trích dẫn của bạn ở đây..."')
          .run();
      }, 10);
    }
  };

  // Hàm chèn code block
  const insertCodeBlock = () => {
    if (!editor) return;
    
    editor.chain().focus().toggleCodeBlock().run();
    
    // Thêm mẫu code nếu chưa có nội dung
    if (!editor.getText().includes('//')) {
      setTimeout(() => {
        editor.chain().focus()
          .insertContent('// Nhập code của bạn ở đây\nconsole.log("Xin chào!");')
          .run();
      }, 10);
    }
  };

  // Hàm chèn bảng - FIX LỖI
  // Hàm chèn bảng - chỉ tạo bảng trống
const insertTable = (rows = 3, cols = 3) => {
  if (!editor) return;
  
  try {
    // Chỉ chèn bảng trống
    editor.chain()
      .focus()
      .insertTable({ 
        rows, 
        cols, 
        withHeaderRow: true 
      })
      .run();
  } catch (error) {
    console.error("Lỗi khi chèn bảng:", error);
  }
  
  setShowTableOptions(false);
};

  // Hàm thêm/xóa hàng/cột trong bảng
  const addTableRow = () => {
    if (!editor) return;
    try {
      editor.chain().focus().addRowAfter().run();
    } catch (error) {
      console.error("Không thể thêm hàng:", error);
    }
  };

  const addTableColumn = () => {
    if (!editor) return;
    try {
      editor.chain().focus().addColumnAfter().run();
    } catch (error) {
      console.error("Không thể thêm cột:", error);
    }
  };

  const deleteTableRow = () => {
    if (!editor) return;
    try {
      editor.chain().focus().deleteRow().run();
    } catch (error) {
      console.error("Không thể xóa hàng:", error);
    }
  };

  const deleteTableColumn = () => {
    if (!editor) return;
    try {
      editor.chain().focus().deleteColumn().run();
    } catch (error) {
      console.error("Không thể xóa cột:", error);
    }
  };

  // Upload ảnh
  const uploadImage = async (file) => {
    if (!file) return;
    
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${ext}`;

      const filePath = `editor/${filename}`;

      const { error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      if (editor) {
        editor.chain().focus().setImage({ 
          src: data.publicUrl,
          alt: `Ảnh minh họa`
        }).run();
      }
    } catch (error) {
      console.error("Upload ảnh thất bại:", error);
      alert("Upload ảnh thất bại!");
    } finally {
      setUploading(false);
    }
  };

  // Hàm thêm link - FIXED
const addLink = () => {
  if (!editor || !linkUrl) return;
  
  // Kiểm tra và thêm https:// nếu cần
  let finalUrl = linkUrl.trim();
  if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
    finalUrl = `https://${finalUrl}`;
  }
  
  // Kiểm tra nếu có text được chọn
  const { from, to } = editor.state.selection;
  const hasTextSelection = from !== to;
  
  if (hasTextSelection) {
    // Áp dụng link cho text đã chọn
    editor.chain().focus().setLink({ href: finalUrl }).run();
  } else {
    // Nếu không có text được chọn, chèn link với text là URL
    editor.chain().focus().setLink({ href: finalUrl }).insertContent(finalUrl).run();
  }
  
  setLinkUrl('');
  setShowLinkInput(false);
};

  // Hàm xóa link
  const removeLink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  };

  if (!editor) {
    return null;
  }

  // Kiểm tra active states - TẤT CẢ RIÊNG BIỆT
  const isHeading1 = editor.isActive('heading', { level: 1 });
  const isHeading2 = editor.isActive('heading', { level: 2 });
  const isHeading3 = editor.isActive('heading', { level: 3 });
  const isBold = editor.isActive('bold');
  const isItalic = editor.isActive('italic');
  const isBulletList = editor.isActive('bulletList');
  const isOrderedList = editor.isActive('orderedList');
  const isBlockquote = editor.isActive('blockquote');
  const isCodeBlock = editor.isActive('codeBlock');
  const isLink = editor.isActive('link');
  const isTable = editor.isActive('table');

  return (
    <TooltipProvider>
      <div className="border rounded-lg overflow-hidden mt-4">
        
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-pure-black border-b">
          
          {/* Undo/Redo */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleToolbarClick(() => editor.chain().focus().undo().run())}
                disabled={!editor.can().undo()}
                className="text-white hover:bg-gray-800"
              >
                <Undo className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hoàn tác (Ctrl+Z)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleToolbarClick(() => editor.chain().focus().redo().run())}
                disabled={!editor.can().redo()}
                className="text-white hover:bg-gray-800"
              >
                <Redo className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Làm lại (Ctrl+Y)</p>
            </TooltipContent>
          </Tooltip>
          
          <Separator orientation="vertical" className="h-6 mx-1 bg-gray-600" />
          
          {/* Headings */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={isHeading1 ? "secondary" : "ghost"}
                onClick={handleToolbarClick(insertHeading1)}
                className={`hover:bg-gray-800 ${
                  isHeading1 
                    ? 'bg-red-600 text-white' 
                    : 'text-white'
                }`}
              >
                <span className="text-xl font-bold">H1</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tiêu đề chính (rất lớn)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={isHeading2 ? "secondary" : "ghost"}
                onClick={handleToolbarClick(insertHeading2)}
                className={`hover:bg-gray-800 ${
                  isHeading2 
                    ? 'bg-red-600 text-white' 
                    : 'text-white'
                }`}
              >
                <span className="text-lg font-bold">H2</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tiêu đề phụ (lớn)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={isHeading3 ? "secondary" : "ghost"}
                onClick={handleToolbarClick(insertHeading3)}
                className={`hover:bg-gray-800 ${
                  isHeading3 
                    ? 'bg-red-600 text-white' 
                    : 'text-white'
                }`}
              >
                <span className="text-base font-bold">H3</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tiêu đề nhỏ (vừa)</p>
            </TooltipContent>
          </Tooltip>
          
          <Separator orientation="vertical" className="h-6 mx-1 bg-gray-600" />
          
          {/* Bold/Italic */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={isBold ? "secondary" : "ghost"}
                onClick={handleToolbarClick(() => editor.chain().focus().toggleBold().run())}
                className={`hover:bg-gray-800 ${
                  isBold 
                    ? 'bg-red-600 text-white' 
                    : 'text-white'
                }`}
              >
                <Bold className="w-4 h-4 font-bold" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>In đậm (Ctrl+B)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={isItalic ? "secondary" : "ghost"}
                onClick={handleToolbarClick(() => editor.chain().focus().toggleItalic().run())}
                className={`hover:bg-gray-800 ${
                  isItalic 
                    ? 'bg-red-600 text-white' 
                    : 'text-white'
                }`}
              >
                <Italic className="w-4 h-4 italic" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>In nghiêng (Ctrl+I)</p>
            </TooltipContent>
          </Tooltip>
          
          <Separator orientation="vertical" className="h-6 mx-1 bg-gray-600" />
          
          {/* Lists */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={isBulletList ? "secondary" : "ghost"}
                onClick={handleToolbarClick(insertBulletList)}
                className={`hover:bg-gray-800 ${
                  isBulletList 
                    ? 'bg-red-600 text-white' 
                    : 'text-white'
                }`}
              >
                <span className="text-lg">•</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Danh sách dấu chấm</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={isOrderedList ? "secondary" : "ghost"}
                onClick={handleToolbarClick(insertOrderedList)}
                className={`hover:bg-gray-800 ${
                  isOrderedList 
                    ? 'bg-red-600 text-white' 
                    : 'text-white'
                }`}
              >
                <span className="text-sm font-mono">1.</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Danh sách số thứ tự</p>
            </TooltipContent>
          </Tooltip>
          
          <Separator orientation="vertical" className="h-6 mx-1 bg-gray-600" />
          
          {/* Link */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <Button
                  size="sm"
                  variant={isLink ? "secondary" : "ghost"}
                  onClick={handleToolbarClick(() => setShowLinkInput(!showLinkInput))}
                  className={`hover:bg-gray-800 ${
                    isLink 
                      ? 'bg-red-600 text-white' 
                      : 'text-white'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                </Button>
                
                {showLinkInput && (
  <div className="absolute top-full left-0 mt-1 p-2 bg-white border rounded-md shadow-lg z-20 w-64">
    <div className="flex flex-col gap-2">
      <Input
        type="url"
        placeholder="https://example.com hoặc example.com"
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
        className="h-8 text-sm"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addLink();
          }
          if (e.key === 'Escape') {
            setShowLinkInput(false);
          }
        }}
      />
      <div className="flex gap-1">
        <Button size="sm" onClick={addLink} className="flex-1">
          {isLink ? "Cập nhật" : "Thêm link"}
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => {
            setShowLinkInput(false);
            setLinkUrl('');
          }}
        >
          Hủy
        </Button>
      </div>
      {isLink && (
        <Button 
          size="sm" 
          variant="destructive" 
          onClick={() => {
            removeLink();
            setShowLinkInput(false);
          }}
          className="w-full mt-1"
        >
          Xóa link
        </Button>
      )}
    </div>
  </div>
)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chèn liên kết (Ctrl+K)</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Quote */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={isBlockquote ? "secondary" : "ghost"}
                onClick={handleToolbarClick(insertQuote)}
                className={`hover:bg-gray-800 ${
                  isBlockquote 
                    ? 'bg-red-600 text-white' 
                    : 'text-white'
                }`}
              >
                <span className="text-xl">"</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chèn trích dẫn</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Code Block */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={isCodeBlock ? "secondary" : "ghost"}
                onClick={handleToolbarClick(insertCodeBlock)}
                className={`hover:bg-gray-800 ${
                  isCodeBlock 
                    ? 'bg-red-600 text-white' 
                    : 'text-white'
                }`}
              >
                <Code className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chèn khối code</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Table với dropdown */}
          <DropdownMenu open={showTableOptions} onOpenChange={setShowTableOptions}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant={isTable ? "secondary" : "ghost"}
                    onClick={handleToolbarClick(() => setShowTableOptions(!showTableOptions))}
                    className={`hover:bg-gray-800 ${
                      isTable 
                        ? 'bg-red-600 text-white' 
                        : 'text-white'
                    }`}
                  >
                    <TableIcon className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chèn bảng</p>
              </TooltipContent>
            </Tooltip>
            
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={() => insertTable(2, 2)}>
                <div className="flex items-center gap-2">
                  <div className="grid grid-cols-2 gap-1 w-6 h-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-gray-300 rounded-sm"></div>
                    ))}
                  </div>
                  <span>Bảng 2x2</span>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => insertTable(3, 3)}>
                <div className="flex items-center gap-2">
                  <div className="grid grid-cols-3 gap-1 w-6 h-6">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-gray-300 rounded-sm"></div>
                    ))}
                  </div>
                  <span>Bảng 3x3</span>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => insertTable(4, 4)}>
                <div className="flex items-center gap-2">
                  <div className="grid grid-cols-4 gap-1 w-6 h-6">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="bg-gray-300 rounded-sm"></div>
                    ))}
                  </div>
                  <span>Bảng 4x4</span>
                </div>
              </DropdownMenuItem>
              
              {isTable && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleToolbarClick(addTableRow)}>
                    <Rows className="w-4 h-4 mr-2" />
                    Thêm hàng
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleToolbarClick(addTableColumn)}>
                    <Columns className="w-4 h-4 mr-2" />
                    Thêm cột
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleToolbarClick(deleteTableRow)}>
                    <Minus className="w-4 h-4 mr-2" />
                    Xóa hàng
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleToolbarClick(deleteTableColumn)}>
                    <Minus className="w-4 h-4 mr-2" />
                    Xóa cột
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Separator orientation="vertical" className="h-6 mx-1 bg-gray-600" />
          
          {/* Upload Image */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleToolbarClick(() => fileRef.current?.click())}
                disabled={uploading}
                className="text-white border-gray-600 hover:bg-gray-800 hover:text-white"
              >
                <Upload className="w-4 h-4 mr-1" />
                {uploading ? "Đang upload..." : "Ảnh"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chèn ảnh từ máy tính</p>
            </TooltipContent>
          </Tooltip>
          
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                uploadImage(file);
                e.target.value = '';
              }
            }}
          />
          
        </div>

        {/* Editor Area */}
        <div className="min-h-[300px] overflow-auto bg-white">
          <style>{`
            .ProseMirror h1 {
              font-size: 2.5em !important;
              
              color: #111827 !important;
              margin: 1em 0 0.5em 0 !important;
              line-height: 1.2 !important;
            }
            
            .ProseMirror h2 {
              font-size: 2em !important;
              
              color: #111827 !important;
              margin: 1em 0 0.5em 0 !important;
              line-height: 1.3 !important;
            }
            
            .ProseMirror h3 {
              font-size: 1.5em !important;
              
              color: #111827 !important;
              margin: 1em 0 0.5em 0 !important;
              line-height: 1.4 !important;
            }
            
            .ProseMirror ul {
              list-style-type: disc !important;
              padding-left: 1.5em !important;
              margin: 1em 0 !important;
            }
            
            .ProseMirror ul li {
              margin: 0.25em 0 !important;
            }
            
            .ProseMirror ol {
              list-style-type: decimal !important;
              padding-left: 1.5em !important;
              margin: 1em 0 !important;
            }
            
            .ProseMirror ol li {
              margin: 0.25em 0 !important;
            }
            
            .ProseMirror blockquote {
              border-left: 4px solid #e5e7eb !important;
              padding-left: 1em !important;
              font-style: italic !important;
              color: #6b7280 !important;
              margin: 1.5em 0 !important;
            }
            
            .ProseMirror blockquote::before {
              content: "\\"\\"";
              font-size: 2em;
              color: #9ca3af;
              margin-right: 0.25em;
              vertical-align: -0.4em;
            }
            
            .ProseMirror pre {
              background: #1f2937 !important;
              color: #f3f4f6 !important;
              padding: 1em !important;
              border-radius: 0.5em !important;
              font-family: 'Courier New', monospace !important;
              margin: 1.5em 0 !important;
            }
            
            .ProseMirror table {
              border-collapse: collapse !important;
              width: 100% !important;
              margin: 1.5em 0 !important;
            }
            
            .ProseMirror table td,
            .ProseMirror table th {
              border: 1px solid #d1d5db !important;
              padding: 0.5em 1em !important;
              text-align: left !important;
            }
            
            .ProseMirror table th {
              background: #f9fafb !important;
              font-weight: bold !important;
            }
              /* Placeholder chỉ hiện khi editor thực sự trống */
              .ProseMirror.is-editor-empty::before {
                content: attr(data-placeholder);
                position: absolute;
                color: #9ca3af;
                pointer-events: none;
                padding: 4px;
              }
              
              .ProseMirror:not(.is-editor-empty)::before {
                display: none;
              }
              
              .ProseMirror p.is-empty:first-child::before {
                content: attr(data-placeholder);
                float: left;
                color: #9ca3af;
                pointer-events: none;
                height: 0;
              }
          `}</style>
          
          <EditorContent 
            editor={editor} 
            className="text-gray-900"
          />
          
          {/* Active states indicator */}
          <div className="p-4 border-t text-xs text-gray-500 bg-gray-50">
            <div className="font-medium mb-1">Đang active:</div>
            <div className="flex flex-wrap gap-2">
              {isHeading1 && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">H1</span>}
              {isHeading2 && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">H2</span>}
              {isHeading3 && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">H3</span>}
              {isBold && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Đậm</span>}
              {isItalic && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Nghiêng</span>}
              {isBulletList && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Danh sách •</span>}
              {isOrderedList && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Danh sách 1.</span>}
              {isBlockquote && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Trích dẫn</span>}
              {isCodeBlock && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Code block</span>}
              {isLink && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Link</span>}
              {isTable && <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Bảng</span>}
            </div>
          </div>
        </div>
        
      </div>
    </TooltipProvider>
  );
}