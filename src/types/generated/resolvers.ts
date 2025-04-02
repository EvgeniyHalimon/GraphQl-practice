import { GraphQLResolveInfo } from 'graphql';
import { User, Post } from '@prisma/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type IAuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: IUser;
};

export type IMutation = {
  __typename?: 'Mutation';
  createPost: IPost;
  deletePost: IPost;
  login: IAuthPayload;
  signup: IAuthPayload;
  updatePost: IPost;
};


export type IMutationCreatePostArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type IMutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type IMutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type IMutationSignupArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type IMutationUpdatePostArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type IPost = {
  __typename?: 'Post';
  author: IUser;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type IQuery = {
  __typename?: 'Query';
  me?: Maybe<IUser>;
  post?: Maybe<IPost>;
  posts: Array<IPost>;
};


export type IQueryPostArgs = {
  id: Scalars['ID']['input'];
};

export type IUser = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  posts: Array<IPost>;
  updatedAt: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  AuthPayload: ResolverTypeWrapper<Partial<Omit<IAuthPayload, 'user'> & { user: IResolversTypes['User'] }>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']['output']>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']['output']>>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Partial<Scalars['String']['output']>>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  AuthPayload: Partial<Omit<IAuthPayload, 'user'> & { user: IResolversParentTypes['User'] }>;
  Boolean: Partial<Scalars['Boolean']['output']>;
  ID: Partial<Scalars['ID']['output']>;
  Mutation: {};
  Post: Post;
  Query: {};
  String: Partial<Scalars['String']['output']>;
  User: User;
};

export type IAuthPayloadResolvers<ContextType = any, ParentType extends IResolversParentTypes['AuthPayload'] = IResolversParentTypes['AuthPayload']> = {
  token?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  createPost?: Resolver<IResolversTypes['Post'], ParentType, ContextType, RequireFields<IMutationCreatePostArgs, 'content' | 'title'>>;
  deletePost?: Resolver<IResolversTypes['Post'], ParentType, ContextType, RequireFields<IMutationDeletePostArgs, 'id'>>;
  login?: Resolver<IResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<IMutationLoginArgs, 'email' | 'password'>>;
  signup?: Resolver<IResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<IMutationSignupArgs, 'email' | 'name' | 'password'>>;
  updatePost?: Resolver<IResolversTypes['Post'], ParentType, ContextType, RequireFields<IMutationUpdatePostArgs, 'id'>>;
};

export type IPostResolvers<ContextType = any, ParentType extends IResolversParentTypes['Post'] = IResolversParentTypes['Post']> = {
  author?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType>;
  post?: Resolver<Maybe<IResolversTypes['Post']>, ParentType, ContextType, RequireFields<IQueryPostArgs, 'id'>>;
  posts?: Resolver<Array<IResolversTypes['Post']>, ParentType, ContextType>;
};

export type IUserResolvers<ContextType = any, ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']> = {
  createdAt?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<IResolversTypes['Post']>, ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IResolvers<ContextType = any> = {
  AuthPayload?: IAuthPayloadResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Post?: IPostResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
};

