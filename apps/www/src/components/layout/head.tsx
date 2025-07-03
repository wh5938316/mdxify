'use client';

import { NavigationMenu } from '@base-ui-components/react/navigation-menu';
import { useRef, useState } from 'react';

import { cn } from '@mdxify/ui';
import { Button } from '@mdxify/ui/components/button';

import Logo from '../logo';

export default function Head() {
  const headerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (value: number) => {
    if (value !== null) {
      setIsOpen(true);
    }
  };
  const handleOpenChangeComplete = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  };

  return (
    <div className="sticky top-2 z-50">
      <div className={cn('z-50 w-full h-auto min-h-12 inset-2 px-6')}>
        <header
          ref={headerRef}
          className={cn(
            'mx-auto my-2 flex max-w-5xl grid-cols-12 gap-4 items-center py-1 px-3 rounded-2xl',
            {
              'bg-gray-900/3 backdrop-blur-lg': !isOpen,
            },
            {
              'bg-background': isOpen,
            },
          )}
        >
          <a className="pl-2 flex items-center justify-start h-full max-h-[34px]">
            <div className="flex items-center justify-start">
              <Logo />
            </div>
          </a>
          <NavigationMenu.Root
            className="flex-1 rounded-lg p-1 text-gray-900"
            // value={2}
            onValueChange={handleValueChange}
            onOpenChangeComplete={handleOpenChangeComplete}
          >
            <NavigationMenu.List className="relative flex">
              <NavigationMenu.Item value={1}>
                <NavigationMenu.Trigger className={triggerClassName}>
                  Documentation
                  <NavigationMenu.Icon className="transition-transform duration-200 ease-in-out data-[popup-open]:rotate-180">
                    <ChevronDownIcon />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className={contentClassName}>
                  <div className="max-w-5xl grid gap-2 grid-cols-5 h-56">
                    <a className="flex col-span-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg relative flex-col justify-end">
                      <div className="absolute inset-0 object-cover">
                        <img
                          src="https://mintlify-assets.b-cdn.net/website/home/nav-assets/Getting%20started.png"
                          className="h-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-primary">Guides</div>
                        <div className="text-sm text-muted-foreground">
                          Start building modern documentation in under five minutes
                        </div>
                      </div>
                    </a>
                    <a className="flex col-span-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg relative flex-col justify-between">
                      <div className="flex">
                        <ComponentsIcon />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-primary">Components</div>
                        <div className="text-sm text-muted-foreground">
                          Explore the variety of components available
                        </div>
                      </div>
                    </a>
                    <a className="flex col-span-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg relative flex-col justify-between">
                      <div className="flex">
                        <ApiPlaygroundIcon />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-primary">Api Playground</div>
                        <div className="text-sm text-muted-foreground">
                          Enable users to interact with your API
                        </div>
                      </div>
                    </a>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item value={2}>
                <NavigationMenu.Trigger className={triggerClassName}>
                  Resources
                  <NavigationMenu.Icon className="transition-transform duration-200 ease-in-out data-[popup-open]:rotate-180">
                    <ChevronDownIcon />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className={contentClassName}>
                  <div className="max-w-5xl grid gap-2 grid-cols-4 h-56">
                    <a className="flex col-span-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg relative flex-col justify-end">
                      <div className="absolute inset-0 object-cover">
                        <img
                          src="https://mintlify-assets.b-cdn.net/website/home/nav-assets/Nav-Customer-May23-Light.png"
                          className="h-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-primary">Customers</div>
                        <div className="text-sm text-muted-foreground">
                          Discover how we help our customers win
                        </div>
                      </div>
                    </a>
                    <a className="flex col-span-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg relative flex-col justify-end">
                      <div className="absolute inset-0 object-cover">
                        <img
                          src="https://mintlify-assets.b-cdn.net/website/enterprise/Ent-Nav-Light.svg"
                          className="h-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-primary">Enterprise</div>
                        <div className="text-sm text-muted-foreground">
                          For organizations with custom needs
                        </div>
                      </div>
                    </a>
                    <a className="flex col-span-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg relative flex-col justify-end">
                      <div className="absolute inset-0 object-cover">
                        <img
                          src="https://mintlify-assets.b-cdn.net/website/home/nav-assets/Blog.png"
                          className="h-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium text-primary">Blog</div>
                        <div className="text-sm text-muted-foreground">
                          Discover and stay updated on what’s happening
                        </div>
                      </div>
                    </a>
                    <div className="grid grid-cols-2 gap-2">
                      <a className="flex col-span-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg relative flex-col justify-between">
                        <div className="flex">
                          <CareersIcon />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="text-sm font-medium text-primary">Careers</div>
                        </div>
                      </a>
                      <a className="flex col-span-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg relative flex-col justify-between">
                        <div className="flex">
                          <WritingGuideIcon />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="text-sm font-medium text-primary">Writing Gruid</div>
                        </div>
                      </a>
                      <a className="flex col-span-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg relative flex-col justify-between">
                        <div className="flex">
                          <IntegrationsIcon />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="text-sm font-medium text-primary">Integrations</div>
                        </div>
                      </a>
                      <a className="flex col-span-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg relative flex-col justify-between">
                        <div className="flex">
                          <WallOfLoveIcon />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="text-sm font-medium text-primary">Wall of Love</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item value={3}>
                <Link className={triggerClassName} href="https://github.com/mui/base-ui">
                  Request Preview
                </Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item value={4}>
                <Link className={triggerClassName} href="https://github.com/mui/base-ui">
                  Pricing
                </Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>

            <NavigationMenu.Portal>
              <NavigationMenu.Backdrop className="fixed inset-0 w-full h-full bg-background/50 backdrop-blur-[5px] transition-all duration-[400ms] data-[closed]:opacity-0 data-[open]:opacity-100 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
              <NavigationMenu.Positioner
                sideOffset={-16}
                collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
                // anchor={headerRef.current}
                anchor={() => document.getElementsByTagName('header')[0]}
                className="box-border h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-[var(--duration)] ease-[var(--easing)] before:absolute before:content-[''] data-[instant]:transition-none data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=left]:before:top-0 data-[side=left]:before:right-[-10px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-2.5 data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-10px] data-[side=right]:before:w-2.5 data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:left-0 data-[side=top]:before:h-2.5"
                style={{
                  ['--duration' as string]: '0.35s',
                  ['--easing' as string]: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <NavigationMenu.Popup className="data-[ending-style]:easing-[ease] relative max-w-5xl h-[var(--popup-height)] w-full m-auto origin-[var(--transform-origin)] rounded-lg bg-[canvas] text-gray-900 shadow-lg shadow-gray-200 transition-[opacity,transform,width,height,scale,translate] duration-[var(--duration)] ease-[var(--easing)] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[ending-style]:duration-150 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 min-[500px]:w-[var(--popup-width)] xs:w-[var(--popup-width)] dark:shadow-none">
                  <NavigationMenu.Arrow className="flex transition-[left] duration-[var(--duration)] ease-[var(--easing)] data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
                    <ArrowSvg />
                  </NavigationMenu.Arrow>
                  <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
                </NavigationMenu.Popup>
              </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
          </NavigationMenu.Root>
          <div className="flex items-center justify-end">
            <Button variant="ghost">Contact Sales</Button>
            <a href="https://mdxify.vercel.app/dashboard">
              <Button variant="default">Dashboard</Button>
            </a>
          </div>
        </header>
      </div>
    </div>
  );
}

function Link(props: NavigationMenu.Link.Props) {
  return (
    <NavigationMenu.Link
      render={
        // Use the `render` prop to render your framework's Link component
        // for client-side routing.
        // e.g. `<NextLink href={props.href} />` instead of `<a />`.
        <a />
      }
      {...props}
    />
  );
}

function ChevronDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CareersIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...props}>
      <g fill="currentColor">
        <path d="M11.75,5.5c-.414,0-.75-.336-.75-.75V2.25c0-.138-.112-.25-.25-.25h-3.5c-.138,0-.25,.112-.25,.25v2.5c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75V2.25c0-.965,.785-1.75,1.75-1.75h3.5c.965,0,1.75,.785,1.75,1.75v2.5c0,.414-.336,.75-.75,.75Z"></path>
        <path d="M17,7.519v-.769c0-1.517-1.233-2.75-2.75-2.75H3.75c-1.517,0-2.75,1.233-2.75,2.75v.769c2.184,1.149,4.643,1.83,7.25,1.943v-.212c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v.212c2.607-.113,5.066-.794,7.25-1.943Z"></path>
        <path d="M9.75,10.962v.538c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-.538c-2.586-.103-5.034-.728-7.25-1.78v4.068c0,1.517,1.233,2.75,2.75,2.75H14.25c1.517,0,2.75-1.233,2.75-2.75v-4.068c-2.216,1.051-4.664,1.677-7.25,1.78Z"></path>
      </g>
    </svg>
  );
}

function WritingGuideIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...props}>
      <g fill="currentColor">
        <path d="M13.25,1H4.75c-1.517,0-2.75,1.233-2.75,2.75V14.25c0,1.517,1.233,2.75,2.75,2.75H13.25c1.517,0,2.75-1.233,2.75-2.75V3.75c0-1.517-1.233-2.75-2.75-2.75ZM5,4.75c0-.414,.336-.75,.75-.75h1.5c.414,0,.75,.336,.75,.75v1.5c0,.414-.336,.75-.75,.75h-1.5c-.414,0-.75-.336-.75-.75v-1.5Zm7.25,8.25H5.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h6.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm0-3H5.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h6.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm0-3h-2c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h2c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"></path>
      </g>
    </svg>
  );
}

function IntegrationsIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_5469_22859)">
        <path
          d="M9.58987 7C10.7099 7 11.6719 6.325 12.1009 5.362C13.5389 6.104 14.6079 7.458 14.9599 9.058C15.0369 9.408 15.3479 9.646 15.6909 9.646C15.7449 9.646 15.7989 9.641 15.8539 9.628C16.2579 9.539 16.5129 9.138 16.4239 8.734C15.9349 6.522 14.3699 4.683 12.2939 3.809C12.0809 2.503 10.9539 1.5 9.58887 1.5C8.07187 1.5 6.83887 2.733 6.83887 4.25C6.83887 5.767 8.07187 7 9.58887 7H9.58987Z"
          fill="currentColor"
        ></path>
        <path
          d="M6.77681 11.8733C6.21681 10.9043 5.15081 10.4073 4.10281 10.5183C4.02581 8.90126 4.66381 7.29926 5.87181 6.19426C6.17781 5.91526 6.19881 5.44026 5.91981 5.13426C5.63981 4.82926 5.16581 4.80726 4.85981 5.08726C3.18781 6.61626 2.37781 8.89126 2.65881 11.1253C2.21381 11.4873 1.88981 11.9723 1.73781 12.5373C1.54881 13.2463 1.64581 13.9883 2.01281 14.6233C2.37981 15.2593 2.97281 15.7153 3.68281 15.9053C3.91881 15.9683 4.15981 16.0003 4.39881 16.0003C4.87581 16.0003 5.34481 15.8753 5.76881 15.6303C7.08081 14.8733 7.53381 13.1883 6.77581 11.8743L6.77681 11.8733Z"
          fill="currentColor"
        ></path>
        <path
          d="M17.443 12.5381C17.253 11.8291 16.797 11.2351 16.162 10.8681C14.85 10.1091 13.163 10.5621 12.405 11.8751C11.845 12.8451 11.949 14.0151 12.569 14.8671C11.209 15.7421 9.50404 15.9901 7.93804 15.4961C7.54104 15.3721 7.12204 15.5911 6.99804 15.9851C6.87304 16.3801 7.09204 16.8011 7.48704 16.9261C8.17004 17.1421 8.87504 17.2471 9.57704 17.2471C11.102 17.2471 12.609 16.7461 13.84 15.8071C14.145 15.9211 14.46 15.9991 14.783 15.9991C15.022 15.9991 15.262 15.9681 15.499 15.9041C16.209 15.7141 16.802 15.2581 17.169 14.6231C17.536 13.9881 17.634 13.2461 17.444 12.5371L17.443 12.5381Z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_5469_22859">
          <rect width="18" height="18" fill="white" transform="translate(0.59082 0.5)"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

function WallOfLoveIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_5469_22851)">
        <path
          d="M15.9988 13.49L14.7358 13.069L14.3148 11.806C14.1778 11.398 13.5028 11.398 13.3658 11.806L12.9448 13.069L11.6818 13.49C11.4778 13.558 11.3398 13.749 11.3398 13.964C11.3398 14.179 11.4778 14.37 11.6818 14.438L12.9448 14.859L13.3658 16.122C13.4338 16.326 13.6258 16.464 13.8408 16.464C14.0558 16.464 14.2468 16.326 14.3158 16.122L14.7368 14.859L15.9998 14.438C16.2038 14.37 16.3418 14.179 16.3418 13.964C16.3418 13.749 16.2038 13.558 15.9998 13.49H15.9988Z"
          fill="currentColor"
        ></path>
        <path
          d="M12.5049 2.5C11.3099 2.515 10.1809 2.99 9.34086 3.806C8.50086 2.991 7.36886 2.515 6.16286 2.5C3.63286 2.515 1.58086 4.584 1.59086 7.109C1.59086 12.362 6.89686 15.538 8.52286 16.387C8.77886 16.52 9.05986 16.587 9.34086 16.587C9.62186 16.587 9.90286 16.52 10.1579 16.387C10.4079 16.257 10.7499 16.065 11.1399 15.827C10.3629 15.535 9.83986 14.802 9.83986 13.965C9.83986 13.102 10.3899 12.34 11.2089 12.068L11.7589 11.884L11.9429 11.333C12.2099 10.535 12.9719 10.001 13.8399 10.001C14.7079 10.001 15.4699 10.535 15.7369 11.331L15.7809 11.463C16.5579 10.225 17.0899 8.774 17.0899 7.114C17.0989 4.586 15.0479 2.517 12.5039 2.502L12.5049 2.5ZM9.08386 8.981L8.13786 9.296L7.82186 10.243C7.77086 10.396 7.62786 10.499 7.46686 10.499C7.30586 10.499 7.16186 10.395 7.11186 10.243L6.79586 9.296L5.84986 8.981C5.69686 8.93 5.59286 8.787 5.59286 8.625C5.59286 8.463 5.69686 8.32 5.84986 8.269L6.79586 7.954L7.11186 7.007C7.21386 6.701 7.72086 6.701 7.82286 7.007L8.13886 7.954L9.08486 8.269C9.23786 8.32 9.34186 8.463 9.34186 8.625C9.34186 8.787 9.23786 8.93 9.08486 8.981H9.08386ZM12.5909 7.5C12.1769 7.5 11.8409 7.164 11.8409 6.75C11.8409 6.336 12.1769 6 12.5909 6C13.0049 6 13.3409 6.336 13.3409 6.75C13.3409 7.164 13.0049 7.5 12.5909 7.5Z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_5469_22851">
          <rect width="18" height="18" fill="white" transform="translate(0.34082 0.5)"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

function ComponentsIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" {...props}>
      <g clipPath="url(#clip0_5469_21884)">
        <path
          d="M6.25 2.50195H3.75C2.7835 2.50195 2 3.28545 2 4.25195V6.75195C2 7.71845 2.7835 8.50195 3.75 8.50195H6.25C7.2165 8.50195 8 7.71845 8 6.75195V4.25195C8 3.28545 7.2165 2.50195 6.25 2.50195Z"
          fill="currentColor"
        ></path>
        <path
          d="M5 16.752C6.79493 16.752 8.25 15.2969 8.25 13.502C8.25 11.707 6.79493 10.252 5 10.252C3.20507 10.252 1.75 11.707 1.75 13.502C1.75 15.2969 3.20507 16.752 5 16.752Z"
          fill="currentColor"
        ></path>
        <path
          d="M15.5 12.752H13.75V11.002C13.75 10.588 13.414 10.252 13 10.252C12.586 10.252 12.25 10.588 12.25 11.002V12.752H10.5C10.086 12.752 9.75 13.088 9.75 13.502C9.75 13.916 10.086 14.252 10.5 14.252H12.25V16.002C12.25 16.416 12.586 16.752 13 16.752C13.414 16.752 13.75 16.416 13.75 16.002V14.252H15.5C15.914 14.252 16.25 13.916 16.25 13.502C16.25 13.088 15.914 12.752 15.5 12.752Z"
          fill="currentColor"
        ></path>
        <path
          d="M14.0829 2.70211C13.6319 1.92011 12.3689 1.91911 11.9179 2.70211L9.65192 6.62611C9.42592 7.01811 9.42592 7.48511 9.65192 7.87611C9.87792 8.26811 10.2829 8.50111 10.7349 8.50111H15.2659C15.7179 8.50111 16.1219 8.26811 16.3489 7.87611C16.5749 7.48511 16.5749 7.01811 16.3489 6.62611L14.0829 2.70211Z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_5469_21884">
          <rect width="18" height="18" fill="white" transform="translate(0 0.5)"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

function ApiPlaygroundIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" {...props}>
      <g clipPath="url(#clip0_5469_21895)">
        <path
          d="M15.0459 2.5H4.5459C3.0289 2.5 1.7959 3.733 1.7959 5.25V13.75C1.7959 15.267 3.0289 16.5 4.5459 16.5H15.0459C16.5629 16.5 17.7959 15.267 17.7959 13.75V5.25C17.7959 3.733 16.5629 2.5 15.0459 2.5ZM7.7959 4.5C8.3479 4.5 8.7959 4.948 8.7959 5.5C8.7959 6.052 8.3479 6.5 7.7959 6.5C7.2439 6.5 6.7959 6.052 6.7959 5.5C6.7959 4.948 7.2439 4.5 7.7959 4.5ZM3.7959 5.5C3.7959 4.948 4.2439 4.5 4.7959 4.5C5.3479 4.5 5.7959 4.948 5.7959 5.5C5.7959 6.052 5.3479 6.5 4.7959 6.5C4.2439 6.5 3.7959 6.052 3.7959 5.5ZM8.5759 12.22C8.8689 12.513 8.8689 12.988 8.5759 13.281C8.4299 13.427 8.2379 13.501 8.0459 13.501C7.8539 13.501 7.6619 13.428 7.5159 13.281L5.2659 11.031C4.9729 10.738 4.9729 10.263 5.2659 9.97L7.5159 7.72C7.8089 7.427 8.2839 7.427 8.5769 7.72C8.8699 8.013 8.8699 8.488 8.5769 8.781L6.8569 10.501L8.5769 12.221L8.5759 12.22ZM14.3259 11.03L12.0759 13.28C11.9299 13.426 11.7379 13.5 11.5459 13.5C11.3539 13.5 11.1619 13.427 11.0159 13.28C10.7229 12.987 10.7229 12.512 11.0159 12.219L12.7359 10.499L11.0159 8.779C10.7229 8.486 10.7229 8.011 11.0159 7.718C11.3089 7.425 11.7839 7.425 12.0769 7.718L14.3269 9.968C14.6199 10.261 14.6199 10.736 14.3269 11.029L14.3259 11.03Z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_5469_21895">
          <rect width="18" height="18" fill="white" transform="translate(0.795898 0.5)"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

function ArrowSvg(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-[canvas]"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-gray-200 dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-gray-300"
      />
    </svg>
  );
}

const triggerClassName =
  'box-border flex items-center justify-center gap-1.5 h-10 ' +
  'px-4 xs:px-3.5 m-0 rounded-md font-medium text-meted ' +
  'text-sm xs:text-base leading-6 select-none no-underline ' +
  'hover:text-primary data-[popup-open]:text-primary ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 focus-visible:relative';

const contentClassName =
  'w-[calc(100vw_-_40px)] max-w-5xl h-full p-2 xs:w-max xs:min-w-[400px] xs:w-max ' +
  'transition-[opacity,transform,translate] duration-[var(--duration)] ease-[var(--easing)] ' +
  'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 ' +
  'data-[starting-style]:data-[activation-direction=left]:translate-x-[-50%] ' +
  'data-[starting-style]:data-[activation-direction=right]:translate-x-[50%] ' +
  'data-[ending-style]:data-[activation-direction=left]:translate-x-[50%] ' +
  'data-[ending-style]:data-[activation-direction=right]:translate-x-[-50%]';
